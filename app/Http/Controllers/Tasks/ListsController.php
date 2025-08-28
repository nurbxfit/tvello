<?php

namespace App\Http\Controllers\Tasks;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

//This is for plural Resources such as:
// - create multiple lists
// - update multiple lists 
// - delete multiple lists
// - archieved multiple lists 
// something like that lah, for now we use just for update only.
class ListsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $boardId)
    {
         $validated = $request->validate([
            'lists' => 'required|array',
            'lists.*.id' => 'required|uuid|exists:task_list,id',
            'lists.*.title' => 'sometimes|string|max:255',
            'lists.*.order' => 'sometimes|numeric',
        ]);

        foreach ($validated['lists'] as $list) {
            DB::table('task_list')
                ->where('id', $list['id'])
                ->update([
                    'title' => $list['title'] ?? null,
                    'order' => $list['order'] ?? null,
                    'updated_at' => now(),
                ]);
        }

        // return redirect()->route('board', $boardId);
        redirect()->back()->with('success','Card updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
