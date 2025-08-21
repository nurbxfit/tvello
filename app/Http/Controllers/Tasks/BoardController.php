<?php

namespace App\Http\Controllers\Tasks;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;


class BoardController extends Controller {
    
    public function boards(Request $request):Response{
        $boardList = DB::table('task_board')
        ->where('team_id',1)
        ->orderBy('created_at', 'desc')
        ->get();

        return Inertia::render("boards/boards",[
            "boards"=> $boardList
        ]);
    }

    public function board(Request $request, string $boardId):Response{
        $board = DB::table('task_board')
            ->where('id', $boardId)
            ->first();

        $taskLists = DB::table('task_list')
            ->where('board_id', $boardId)
            ->get();

        $cards = DB::table('task_card')
            ->whereIn('list_id', $taskLists->pluck('id'))
            ->get()
            ->groupBy('list_id');

        $taskLists->transform(function ($list) use ($cards) {
            $list->cards = $cards->get($list->id, collect());
            return $list;
        });


        if(!$board) {
            abort(404,"Board not found");
        }

        return Inertia::render("boards/board",[
            "board"=> $board,
            "lists"=> $taskLists
        ]);
    }

    public function create(Request $request,string $boardId): RedirectResponse {

        // Validate the request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image_id' => 'required|string',
            'image_thumb_url' => 'required|url',
            'image_full_url' => 'required|url',
            'image_user_name' => 'required|string',
            'image_link_html' => 'required|string',
            'team_id' => 'required|string',
        ]);

        // Add timestamps and UUID manually
        $boardId = Str::uuid();
        $validated['id'] = $boardId;
        $validated['created_at'] = now();
        $validated['updated_at'] = now();

        // Insert using DB facade
        DB::table('task_board')->insert($validated);

        return redirect("/boards/{$boardId}");
    }

     public function update(Request $request, string $boardId): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'image_id' => 'sometimes|string',
            'image_thumb_url' => 'sometimes|url',
            'image_full_url' => 'sometimes|url',
            'image_user_name' => 'sometimes|string',
            'image_link_html' => 'sometimes|string',
            'team_id' => 'sometimes|string',
        ]);

        // Add updated timestamp
        $validated['updated_at'] = now();

        // Update using DB facade
        $affected = DB::table('task_board')
            ->where('id', $boardId)
            ->update($validated);

        if ($affected === 0) {
            abort(404, 'Board not found');
        }

        return redirect("/boards/{$boardId}");
    }

    public function destroy(Request $request, string $boardId): RedirectResponse
    {
        $affected = DB::table('task_board')
            ->where('id', $boardId)
            ->delete();

        if ($affected === 0) {
            abort(404, 'Board not found');
        }

        return redirect("/boards");
    }
    
    // public function searchBoards(Request $request): Response
    // {
    //     $query = $request->get('q');
        
    //     $boards = DB::table('task_board')
    //         ->where('title', 'LIKE', "%{$query}%")
    //         ->orWhere('image_user_name', 'LIKE', "%{$query}%")
    //         ->get();

    //     return Inertia::render("boards/search-results", [
    //         "boards" => $boards,
    //         "query" => $query
    //     ]);
    // }
}