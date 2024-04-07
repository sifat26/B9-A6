let c = 0;
const spiner=document.getElementById('spinner');
const spiner2=document.getElementById('spinner2');

const allPost = async () => {
    spiner.classList.remove('hidden');
  const response = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await response.json();
  setTimeout(() => {
    spiner.classList.add('hidden');  
      allPostDisplay(data.posts);
  }, 2000);
};
const allPostDisplay = (data) => {
  // console.log(data);
  const allPostContainer = document.getElementById("allPostContainer");
  allPostContainer.innerHTML='';

  data.forEach((post) => {
    // console.log(post);
    const div = document.createElement("div");
    let activeLight = "";
    if (post.isActive) {
      activeLight = `<i class="fa-solid fa-circle text-xs lg:text-base text-green-600 absolute -top-1 -right-1"></i>`;
    } else {
      activeLight = `<i class="fa-solid fa-circle text-xs lg:text-base text-red-600 absolute -top-1 -right-1"></i>`;
    }
    
    div.innerHTML = `
        <div
        class="bg-zinc-100 hover:bg-indigo-400 duration-300 hover:bg-opacity-10 rounded-3xl border hover:border-indigo-400 p-4 lg:p-6 grid gap-5 grid-cols-12 col-span-8 mb-4"
      >
        <div class="col-span-2 relative">
          <img class="rounded-lg " src="${post.image}" alt="" />
          ${activeLight}
        </div>
        <div class="space-y-4 col-span-10">
          <div
            class="flex gap-5 text-slate-900 text-opacity-80 text-sm font-medium"
          >
            <p>#${post.category}</p>
            <p>Author : ${post.author.name}</p>
          </div>
          <h1 class="text-slate-900 text-lg lg:text-xl font-bold">
            ${post.title}
          </h1>
          <p class="text-slate-900 text-opacity-60 text-sm lg:text-base font-normal">
          ${post.description}
          </p>
          <hr />
          <div class="flex justify-between">
            <div
              class="flex items-center gap-6 text-slate-900 text-opacity-60 text-sm lg:text-base font-normal"
            >
              <div class="flex gap-3 items-center">
                <i class="fa-regular fa-comment"></i>
                <p>${post.comment_count}</p>
              </div>
              <div class="flex gap-3 items-center">
                <i class="fa-regular fa-eye"></i>
                <p>${post.view_count}</p>
              </div>
              <div class="flex gap-3 items-center">
                <i class="fa-regular fa-clock"></i>
                <p><span>${post.posted_time}</span> min</p>
              </div>
            </div>
            <div>
            <button onclick="readHandler('${post.title.replace(/'/g, "@")}','${
      post.view_count
    }')">
            
            <img src="./images/email 1.svg" alt="" />
            </button>
            </div>
          </div>
        </div>
      </div>`;
    allPostContainer.appendChild(div);
    
  });
};

const readHandler = (title, view_count) => {
    spiner.classList.add('hidden');

  //   console.log(title);
  //   console.log(view_count);
  c++;
  const div = document.createElement("div");
  div.innerHTML = `
   
            <div class="bg-white flex p-4 gap-3 rounded-2xl mt-4">
              <p>${title.replace(/@/g, "'")}</p>
              <div class="flex gap-3 items-center">
                <i class="fa-regular fa-eye"></i>
                <p>${view_count}</p>
              </div>
            </div>`;
  const titleHandler = document.getElementById("titleHandler");
  titleHandler.appendChild(div);
  const markReadCount = document.getElementById("markReadCount");

  markReadCount.innerText = c;
  console.log(markReadCount);
};

allPost();

const latestPost = async () => {
  spiner2.classList.remove('hidden');

  const response = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await response.json();
  // console.log(data);
  setTimeout(() => {
  spiner2.classList.add('hidden');

    
      latestPostDisplay(data);
  }, 2000);
};

const latestPostDisplay = (data) => {
  const ldiv = document.getElementById("lpost");

  data.forEach((post) => {
    // console.log(post);
    const div = document.createElement("div");


    div.innerHTML = `
        <div class="space-y-4 border rounded-2xl  p-4 lg:p-6">
            <div>
              <img class="rounded-2xl" src="${post.cover_image}" alt="" />
            </div>
            <div class="flex items-center gap-2">
              <i class="fa-regular fa-calendar"></i>
              <p>${
                post.author.posted_date
                  ? post.author.posted_date
                  : "No publish date"
              }</p>
            </div>
            <div>
              <h1 class="text-slate-900 text-lg font-extrabold">
                ${post.title}
              </h1>
              <p class="text-slate-900 text-opacity-60  text-sm font-normal">
                ${post.description}
              </p>
            </div>
            <div class="flex gap-4">
              <div>
                <img class="w-11  rounded-full" src="${
                  post.profile_image
                }" alt="" />
              </div>
              <div>
                <h3 class="text-slate-900 text-sm lg:text-base font-bold">
                  ${post.author.name}
                </h3>
                <p class="text-slate-900 text-opacity-60 text-sm lg:text-base font-normal">
                ${post.author.designation ? post.author.designation : "Unknown"}
                </p>
              </div>
            </div>
          </div>`;
    ldiv.appendChild(div);
  });
};

latestPost();
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", (e) => {
    spiner.classList.remove('hidden');
    
  const searchTerm = document.getElementById("searchInput");
  e.preventDefault();
  let Term=searchTerm.value.toLowerCase();
  // console.log(searchTerm.value);
  if (
    Term === "coding" ||
    Term === "comedy" ||
    Term === "music"
  ) {

    postQuery(searchTerm.value);
  }
  else{
    alert("Please Enter The Right Input");
    allPost()
    
  }
});
const postQuery = async (value) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${value}`
  );
  const data = await response.json();

  setTimeout(() => {
  spiner.classList.add('hidden');

    
      allPostDisplay(data.posts);
  }, 2000);
//   spiner.classList.add("hidden");
//    console.log(data);
};
