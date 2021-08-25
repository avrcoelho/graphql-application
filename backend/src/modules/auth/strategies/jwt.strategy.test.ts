import * as jwt_strategy from "./jwt.strategy"
// @ponicode
describe("validate", () => {
    let inst: any

    beforeEach(() => {
        inst = new jwt_strategy.default()
    })

    test("0", async () => {
        await inst.validate(true)
    })

    test("1", async () => {
        await inst.validate("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E")
    })

    test("2", async () => {
        await inst.validate(7588892)
    })

    test("3", async () => {
        await inst.validate({ role: "myDIV", id: "a85a8e6b-348b-4011-a1ec-1e78e9620782" })
    })

    test("4", async () => {
        await inst.validate({ role: "myDIV", id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9" })
    })

    test("5", async () => {
        await inst.validate(NaN)
    })
})
