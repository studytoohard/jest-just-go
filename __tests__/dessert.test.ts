import dessert from "../src/dessert";
import desserCommentModule from "../src/desserCommentModule";
jest.mock("../src/desserCommentModule");

describe("test dessert feature", () => {
    test("enjoy the cake", () => {
        const cake = new dessert('cake');
        expect(cake.enjoy()).toBe("Enjoy the cake");
    })
})

describe("test dessert feature with mock", () => {
    test("enjoy the cake with mock function", () => {
        const dessertFactoryMock = jest.fn(name => new dessert(name));
        const cake = dessertFactoryMock('cake');
        expect(cake.enjoy()).toBe("Enjoy the cake");
        expect(dessertFactoryMock.mock.results[0].value.enjoy()).toBe("Enjoy the cake");
        console.log(dessertFactoryMock.mock);
    })
    test("enjoy the cake with mock return value", () => {
        const dessertFactoryMock = jest.fn(name => new dessert(name));
        const cake = new dessert('cake');
        dessertFactoryMock.mockReturnValue(cake);
        const tiramisu = dessertFactoryMock('tiramisu');
        expect(tiramisu.enjoy()).toBe("Enjoy the cake");
        expect(tiramisu).toEqual(cake);
        expect(dessertFactoryMock.mock.results[0].value).toEqual(cake);
    })
    test("comment the dessert with mock module", () => {
        const mockedDessert = desserCommentModule as jest.Mocked<typeof desserCommentModule>;
        mockedDessert.comments.mockReturnValue(['not bad']);
        expect(mockedDessert.comments("cake is so good")).toEqual(['not bad']);
        expect(dessert.comment).toEqual([]);
    })
    test("comment the dessert with mock implementations", () => {
        const mockedDessert = desserCommentModule as jest.Mocked<typeof desserCommentModule>;
        mockedDessert.comments.mockImplementation((message: string) => {
            dessert.comments(message);
            return ['not bad'];
        });
        expect(mockedDessert.comments("cake is so good")).toEqual(['not bad']);
        expect(dessert.comment).toEqual(['cake is so good']);
    })
})