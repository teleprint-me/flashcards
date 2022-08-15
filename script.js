buildFlashcard = (element, index) => {
  const flashcard = document.createElement("article");
  const wrapper = document.createElement("section");
  const header = document.createElement("header");
  const remove = document.createElement("i");
  const answer = document.createElement("p");
  const question = document.createElement("p");

  remove.addEventListener("click", () => {
    container.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(container));
    window.location.reload();
  });

  flashcard.addEventListener("click", () => {
    wrapper.classList.toggle("flashcard-flip");
  });
  
  question.textContent = element.question;
  answer.textContent = element.answer;
  
  flashcard.className = "flashcard";
  wrapper.className = "flashcard-wrapper"
  header.className = "flashcard-header";
  question.className = "flashcard-face flashcard-front";
  answer.className = "flashcard-face flashcard-back";
  remove.className = "bx bxs-x-circle";

  header.appendChild(remove);
  wrapper.appendChild(header);
  wrapper.appendChild(question);
  wrapper.appendChild(answer);
  flashcard.appendChild(wrapper);
  
  document.querySelector("main").appendChild(flashcard);
}

createFlashcard = () => {
  const question = document.querySelector("#app-form-question");
  const answer = document.querySelector("#app-form-answer");

  let flashcard_info = {
    'question': question.value,
    'answer': answer.value
  }

  container.push(flashcard_info);
  localStorage.setItem('items', JSON.stringify(container));
  buildFlashcard(container[container.length - 1], container.length - 1);
  question.value = "";
  answer.value = "";
}

let container = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];

container.forEach(buildFlashcard);

// display form
document.
  querySelector("#app-form-show").
  addEventListener("click", () => {
    document.querySelector("#app-form").style.display = "flex";
  });

// hide form
document.
  querySelector("#app-form-hide").
  addEventListener("click", () => {
    document.querySelector("#app-form").style.display = "none";
  });

// save form contents to local storage
document.
  querySelector("#app-form-save").
  addEventListener("click", () => {
    createFlashcard();
  });

// delete flashcards
document.
  querySelector("#app-main-reset").
  addEventListener("click", () => {
    localStorage.clear();
    document.querySelector("main").innerHTML = '';
    container = [];
  });
