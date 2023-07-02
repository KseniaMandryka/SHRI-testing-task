import { waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import events from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { wrapWithProviders, addItemToCart } from "./utils"

const params = {
  name: "Иван",
  phone: "01234567891",
  address: "Москва"
}


describe("Форма отправки", () => {

  it("Форма с пустыми полями не отправляется", async () => {
    const { container, history } = wrapWithProviders()
    await addItemToCart({ id: 0, history, count: 1 })
    history.push("/cart")
    const checkoutBtn = container.querySelector(".Form-Submit")
    await events.click(checkoutBtn)
    const errorMsg = container.querySelector(".invalid-feedback")
    expect(errorMsg).toBeInTheDocument()
  })

  it("Форма с валидными данными отправляется", async () => {
    const { container, history, getByRole } = wrapWithProviders()
    await addItemToCart({ id: 0, history, count: 1 })
    history.push("/cart")

    const nameField = getByRole("textbox", { name: "Name" })
    const phoneField = getByRole("textbox", { name: "Phone" })
    const addressField = getByRole("textbox", { name: "Address" })

    await events.type(nameField, params.name)
    await events.type(phoneField, params.phone)
    await events.type(addressField, params.address)

    const checkoutBtn = container.querySelector(".Form-Submit")
    await events.click(checkoutBtn)
    const successMsg = document.querySelector(".Cart-SuccessMessage")
    await waitFor(() => expect(successMsg).toBeInTheDocument())
  })

  test("сообщение об сделанном заказе", async () => {
    const { container, history, getByRole } = wrapWithProviders()
    await addItemToCart({ id: 0, history, count: 1 })
    history.push("/cart")

    // const params = {
    //   name: "Иван",
    //   phone: "01234567891",
    //   address: "Москва"
    // }

    const nameField = getByRole("textbox", { name: "Name" })
    const phoneField = getByRole("textbox", { name: "Phone" })
    const addressField = getByRole("textbox", { name: "Address" })

    await events.type(nameField, params.name)
    await events.type(phoneField, params.phone)
    await events.type(addressField, params.address)

    const checkoutBtn = container.querySelector(".Form-Submit")
    await events.click(checkoutBtn)
    const successMsg = document.querySelector(".alert-success")
    await waitFor(() => expect(successMsg).toBeInTheDocument())
  })

})