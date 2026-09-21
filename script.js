const server = document.getElementById("server");
const information = document.getElementById("information");

server.addEventListener("click", function() {

    information.innerHTML = `
        <h2>SERVER</h2>

        <p>
            This is a physical computer inside the data centre.
            Servers can host websites, databases, virtual machines
            and many other services.
        </p>

        <p>
            The server is mounted inside a rack.
        </p>
    `;

});