import {postPosts} from './postPosts';
import {postComments} from './postComments';
import {postUser} from './postUser';
import {getComments} from "./get-comments";
import {getCommentsBySearchText} from "./get-comments-by-search-text";
import {getCommentsGraphInfo} from "./get-comments-graph-info";



export const backendAPI = {
    postPosts,
    postComments,
    postUser,
    getComments,
    getCommentsBySearchText,
    getCommentsGraphInfo,
}
