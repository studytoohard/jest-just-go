import dessert from "./dessert";

module desserCommentModule {
    export function comments(message: string) {
        dessert.comments(message);
        return dessert.comment;
    }

}

export default desserCommentModule;