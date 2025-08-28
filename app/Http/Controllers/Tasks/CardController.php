<?php

namespace App\Http\Controllers\Tasks;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CardController extends Controller
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
    public function store(Request $request, $board, $list)
    {
        // validate request body
        $validated = $request->validate([
            "title" => 'required|string|max:255'
        ]);

        // validate resources parent 
        $boardExits = DB::table('task_board')->where('id',$board)->first();
        if(!$boardExits) {
            return abort(404,'Board not found');
        }

        $listExist = DB::table('task_list')->where('id',$list)->first();

        if(!$listExist) {
            return abort(404,'List not found');
        }
        
        // determine card order
        $lastCardInList = DB::table('task_card')
            ->where('list_id',$list)
            ->orderBy('order','desc')
            ->first();

        $newOrder = $lastCardInList ? $lastCardInList->order + 1 : 1;


        $cardId = Str::uuid();
        $validated['id'] = $cardId;
        $validated['order'] = $newOrder;
        $validated['description'] = '';
        $validated['list_id'] = $list;
        $validated['created_at'] = now();
        $validated['updated_at'] = now();
        
        // dd($validated);
        DB::table('task_card')->insert($validated);

        return redirect()->back()->with('success','Card created!');
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
    public function update(Request $request, string $board)
    {
        
    }


    public function updateMany (Request $request, string $boardId, string $listId){
        // todo, check if parent resources (board and list exists)
        // todo, check if have permission to update this ? (maybe add a middleware here ?)
        abort_if(!DB::table('task_board')->where('id', $boardId)->exists(), 404);
        abort_if(!DB::table('task_list')->where('id', $listId)->exists(), 404);

        $validated = $request->validate([
            'cards' => 'required|array',
            'cards.*.id' => 'required|uuid|exists:task_card,id',
            'cards.*.title' => 'sometimes|string|max:255',
            'cards.*.order' => 'sometimes|numeric',
        ]);

        foreach($validated['cards'] as $card){
            DB::table('task_card')
                ->where('id', $card['id'])
                ->update([
                    'title' => $card['title'] ?? null,
                    'order' => $card['order'] ?? null,
                    'list_id' => $listId,
                    'updated_at' => now(),
                ]);
        }

        return redirect()->route('board', $boardId);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
