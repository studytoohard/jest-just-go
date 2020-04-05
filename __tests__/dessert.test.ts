import dessert from "../src/dessert";

describe("test dessert feature", () => {
    test("enjoy the cake", () => {
        const cake = new dessert('cake');
        expect(cake.enjoy()).toBe("Enjoy the cake");
    })
})