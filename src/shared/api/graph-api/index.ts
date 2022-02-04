import {getAllMediaFromInstagramPage} from './get-all-media-from-instagram-page';
import {getFacebookPages} from './get-facebook-pages';
import {getInstagramAccountId} from './get-instragram-account-id';
import {getMediaComments} from './get-media-comments';
import {deleteComment} from './delete-comment'
import {replyText} from './reply-text'
import {getUserInfo} from './get-user-info';
import {getMediaInsights} from './get-media-insights';
import {getUserInsights} from "./get-user-insights";

export const graphApi = {
    getAllMediaFromInstagramPage,
    getFacebookPages,
    getInstagramAccountId,
    getMediaComments,
    deleteComment,
    replyText,
    getUserInfo,
    getMediaInsights,
    getUserInsights
};