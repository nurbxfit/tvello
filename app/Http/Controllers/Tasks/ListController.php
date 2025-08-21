<?php

namespace App\Http\Controllers\Tasks;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ListController extends Controller {
    public function store(Request $request, string $boardId): RedirectResponse {
        // Validate the request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $lastTaskList = DB::table('task_list')
        ->where('board_id', $boardId)
        ->orderBy('order','desc')
        ->first();

        $newOrder = $lastTaskList ? $lastTaskList->order + 1 : 1;

        $listId = Str::uuid();
        $validated['id'] = $listId;
        $validated['order'] = $newOrder;
        $validated['board_id'] = $boardId;
        $validated['created_at'] = now();
        $validated['updated_at'] = now();

        DB::table('task_list')->insert($validated);

    
        return redirect()->route('board',$boardId);
    }

    public function update(Request $request, string $boardId, string $listId) : RedirectResponse {
        $validated = $request->validate([
            "title" =>'sometimes|string|max:255',
            "order" =>'sometimes|number'
        ]);
        // Add updated timestamp
        $validated['updated_at'] = now();

        $affected = DB::table('task_list')
            ->where('id', $listId)
            ->update($validated);

        if ($affected === 0) {
            abort(404, 'Board not found');
        }

         return redirect()->route('board',$boardId);
    }


    public function destroy(Request $request, string $boardId, string $listId) : RedirectResponse {

        // dd($listId);
        $affected = DB::table('task_list')
        -> where('id',$listId)
        ->delete();

        if($affected == 0){
            abort(404,'List not found');
        }

        return redirect()->route('board',$boardId);
    }
}