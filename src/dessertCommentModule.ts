import dessert from "./dessert";

module dessertCommentModule {
    export function comments(message: string) {
        dessert.comments(message);
        return dessert.comment;
    }

}

export default dessertCommentModule;