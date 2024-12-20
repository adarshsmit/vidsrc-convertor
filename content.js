function addHoverButton() {
  console.log("Running addHoverButton");
  // General selector for title and year elements
  let titleElement =
    document.querySelector('h2 a[href*="/movie/"]') ||
    document.querySelector('h2 a[href*="/tv/"]') ||
    document.querySelector('h2 a[href*="/person/"]');

  let yearElement =
    document.querySelector(".title h2 span.release_date") ||
    document.querySelector(".title h2 span.year") ||
    document.querySelector(".title h2 span.date");

  let hoverButton = document.createElement("button");
  hoverButton.innerText = "Vidsrc";
  hoverButton.className = "tmdb-hover-button";

  let baseUrl = "https://www.vidsrc.to/embed";

  hoverButton.addEventListener("click", function () {
    console.log("Button clicked");
    let url = window.location.href;
    let match = url.match(/\/(movie)\/(\d+)/);
    if (match) {
      let newUrl = `${baseUrl}/${match[1]}/${match[2]}`;
      console.log("New URL:", newUrl);
      open(newUrl, "_blank");
    } else {
      let formContainer = document.createElement("div");

      formContainer.className = "tmdb-form-container";
      let seasonSelect = document.createElement("select");
      seasonSelect.className = "tmdb-select";
      seasonSelect.id = "season-select";
      for (let i = 1; i <= 20; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.text = "Season " + i;
        seasonSelect.appendChild(option);
      }
      let episodeSelect = document.createElement("select");
      episodeSelect.className = "tmdb-select";
      episodeSelect.id = "episode-select";
      for (let i = 1; i <= 50; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.text = "Episode " + i;
        episodeSelect.appendChild(option);
      }
      let submitButton = document.createElement("button");
      submitButton.innerText = "Go";
      submitButton.className = "tmdb-submit-button";
      submitButton.addEventListener("click", function () {
        let selectedSeason = document.getElementById("season-select").value;
        let selectedEpisode = document.getElementById("episode-select").value;
        let url = window.location.href;
        let match = url.match(/\/tv\/(\d+)/);
        if (match) {
          //   let baseUrl = "https://www.themoviedb.org";
          //   let newUrl = `${baseUrl}/tv/${match[1]}/season/${selectedSeason}/episode/${selectedEpisode}`;
          let newUrl = `${baseUrl}/tv/${match[1]}/${selectedSeason}/${selectedEpisode}`;
          console.log("New URL:", newUrl);
          window.open(newUrl, "_blank");
        } else {
          console.log("Could not extract URL part");
        }
      });
      formContainer.appendChild(seasonSelect);
      formContainer.appendChild(episodeSelect);
      formContainer.appendChild(submitButton);
      document.body.appendChild(formContainer);
      // Event listener to close the form when clicking outside of it
      function handleClickOutside(event) {
        if (
          !formContainer.contains(event.target) &&
          event.target !== hoverButton
        ) {
          formContainer.remove();
          document.removeEventListener("click", handleClickOutside);
        }
      }
      document.addEventListener("click", handleClickOutside);
    }
  });
  if (titleElement && yearElement) {
    console.log("Title and year elements found");
    yearElement.parentNode.insertBefore(hoverButton, yearElement.nextSibling);
  } else if (titleElement) {
    console.log("Only title element found");
    titleElement.parentNode.insertBefore(hoverButton, titleElement.nextSibling);
  } else {
    console.log("Title or year element not found");
  }
}
let isDetailsPage = /\/(movie|tv)\/[1-9][\w-]*$/.test(window.location.pathname);
if (document.readyState === "complete") {
  if (isDetailsPage) {
    addHoverButton();
  }
} else {
  if (isDetailsPage) window.addEventListener("load", addHoverButton);
}
