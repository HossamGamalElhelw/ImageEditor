const fileInput = document.querySelector(".file-input");
const filterOptions = document.querySelectorAll(".filter button");
const previewImg = document.querySelector(".preview-img img");
const filterName = document.querySelector(".filter-info .name");
const filterSlider = document.querySelector(".slider input");
const rotateOptions = document.querySelectorAll(".rotate button");
const filterValue = document.querySelector(".filter-info .value");
const chooseImgBtn = document.querySelector(".choose-img");
const resetFilterBtn = document.querySelector(".reset-filter");
const saveImgBtn = document.querySelector(".save-img");

let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0,
  rotate = 0,
  flipHorizontal = 1,
  flipVertical = 1;

const applyFilters = () => {
  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
};

const loadImage = () => {
  let file = fileInput.files[0]; // getting user selected file

  if (!file) return; // don't return undefine when not selected any img
  previewImg.src = URL.createObjectURL(file); // passing file url as preview img src
  previewImg.addEventListener("load", () => {
    resetFilterBtn.click(); // reset the filter values when click in btn
    document.querySelector(".container").classList.remove("disable");
  });
};
filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelector(".filter .active").classList.remove("active");
    option.classList.add("active");

    filterName.innerText = option.innerText;

    if (option.id === "brightness") {
      filterSlider.max = "200";
      filterSlider.value = brightness;
      filterValue.innerText = `${brightness}%`;
    } else if (option.id === "saturation") {
      filterSlider.max = "200";
      filterSlider.value = saturation;
      filterValue.innerText = `${saturation}%`;
    } else if (option.id === "inversion") {
      filterSlider.max = "100";
      filterSlider.value = inversion;
      filterValue.innerText = `${inversion}%`;
    } else {
      filterSlider.max = "100";
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    }
  });
});
const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  const selectedFilter = document.querySelector(".filter .active"); // getting selected filter btn

  if (selectedFilter.id === "brightness") {
    brightness = filterSlider.value;
  } else if (selectedFilter.id === "saturation") {
    saturation = filterSlider.value;
  } else if (selectedFilter.id === "inversion") {
    inversion = filterSlider.value;
  } else {
    grayscale = filterSlider.value;
  }
  applyFilters();
};

rotateOptions.forEach((option) => {
  option.addEventListener("click", () => {
    // adding click event listener to all rotate/flip buttons
    if (option.id === "left") {
      rotate -= 90; // if clicked btn is left rotate, decrement rotate value by -90
    } else if (option.id === "right") {
      rotate += 90;
    } else if (option.id === "horizontal") {
      // if flipHorizontal value is 1 , set it -1 else -1
      flipHorizontal = flipHorizontal === 1 ? -1 : 1;
    } else {
      flipVertical = flipVertical === 1 ? -1 : 1;
    }
    applyFilters();
  });
});

const resetFilter = () => {
  //reset all variable value to defaults
  brightness = 100;
  saturation = 100;
  inversion = 0;
  grayscale = 0;
  rotate = 0;
  flipHorizontal = 1;
  flipVertical = 1;
  filterOptions[0].click();
  applyFilters();
};

const saveImage = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d"); // return a drawing context on the canvas
  canvas.width = previewImg.naturalWidth;
  canvas.height = previewImg.naturalHeight;

  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  ctx.translate(canvas.width / 2, canvas.height / 2); // translating canvas from center
  if (rotate !== 0) {
    ctx.rotate((rotate * Math.PI) / 180);
  }
  ctx.drawImage(
    previewImg,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );

  const link = document.createElement("a"); // creating <a>
  link.download = "image-Editor.jpg"; // passing <a> tag download value to "image.jpg"
  link.href = canvas.toDataURL(); // passing <a> tag href value to canvas data url
  link.click(); // clicking <a> tag so the image download
};

filterSlider.addEventListener("input", updateFilter);

resetFilterBtn.addEventListener("click", resetFilter);

saveImgBtn.addEventListener("click", saveImage);

fileInput.addEventListener("change", loadImage);

chooseImgBtn.addEventListener("click", () => fileInput.click());
