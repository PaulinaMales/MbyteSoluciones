// login.test.js
import $ from "jquery";
import iniciarSesion from "../test";

// Mockear la librería jQuery
jest.mock("jquery");

describe("iniciarSesion", () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada prueba
    jest.clearAllMocks();
    // Configurar un contenedor de elementos para el formulario y otros elementos
    document.body.innerHTML = `
      <form id="miFormulario">
        <input type="text" id="email" value="elizabeth150301@gmail.com" />
        <input type="password" id="password" value="Males2001" />
      </form>
    `;
  });

  it("Llama a la API y redirige al Administrador en caso de éxito", async () => {
    // Mockear la llamada AJAX para simular un inicio de sesión exitoso
    $.ajax.mockImplementationOnce((config) => {
      config.success({ tipo_cuenta: "Admin", token: "fakeToken" });
    });

    // Llamar a la función de inicio de sesión
    await iniciarSesion(new Event("submit"));

    // Verificar la llamada a la API
    expect($.ajax).toHaveBeenCalledWith({
      type: "POST",
      contentType: "application/json",
      url: "https://mbytesolucionesapi.onrender.com/api/login",
      data: '{"correo":"elizabeth150301@gmail.com","contrasenia":"Males2001"}',
      success: expect.any(Function),
      error: expect.any(Function),
    });

    expect(localStorage.getItem("token")).toEqual("fakeToken");
  });


});