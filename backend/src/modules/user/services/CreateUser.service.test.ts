import * as CreateUser_service from "./CreateUser.service"

// @ponicode
describe("execute", () => {
    let inst: any

    beforeEach(() => {
        inst = new CreateUser_service.default({}, {})
    })

    test("0", async () => {
        await inst.execute({ name: "Jean-Philippe", email: "TestUpperCase@Example.com", password: "$p3onyycat" })
    })

    test("1", async () => {
        await inst.execute({ name: "Anas", email: "bed-free@tutanota.de", password: "NoWiFi4you" })
    })

    test("2", async () => {
        await inst.execute({ name: "Anas", email: "email@Google.com", password: "$p3onyycat" })
    })

    test("3", async () => {
        await inst.execute({ name: "Jean-Philippe", email: "user@host:300", password: "YouarenotAllowed2Use" })
    })

    test("4", async () => {
        await inst.execute({ name: "Pierre Edouard", email: "bed-free@tutanota.de", password: "YouarenotAllowed2Use" })
    })

    test("5", async () => {
        await inst.execute({ name: "", email: "", password: "" })
    })
})
