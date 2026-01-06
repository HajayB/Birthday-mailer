document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.querySelector("form");

    const usernameInput = form.querySelector('input[name="username"]');

    const emailInput = form.querySelector('input[name="email"]');

    const dobInput = form.querySelector('input[name="dob"]');


    form.addEventListener("submit", async(e)=>{
        e.preventDefault();

        const username = usernameInput.value.trim()

        const email = emailInput.value.trim()

        const dob = dobInput.value.trim()


        if(!username || !email || !dob){
            return systemMessageHandler("error", "All fields are required.");
        }
        try{
            const response = await fetch("/api/signup",{
                method:"POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({username,email, dob}),
            })

            const data = await response.json();

            if(!response.ok){
                const errorMessage = data.message || "signup failed";
                return systemMessageHandler("error", errorMessage)
            }

            setTimeout(()=>{
                systemMessageHandler("success","Form submitted successfully!")
            }, 4000);
        }catch(error){
            systemMessageHandler("error", "Network error. Please try again.");
        }
    })
})

const systemMessage = document.getElementById("systemMessages");

function systemMessageHandler(type, message) {
  systemMessage.textContent = message;
  systemMessage.className = ""; // reset classes

  if (type === "error") {
    systemMessage.classList.add("error");
  } else if (type === "success") {
    systemMessage.classList.add("success");
  } else {
    alert("Something went wrong");
  }
}
