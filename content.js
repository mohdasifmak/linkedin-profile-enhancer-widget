const profiles = {
    "lakshit2808": {
      companyName: "Force Equals",  
      matchScore: 86,
      accountStatus: "Target"
    },
    "mchabot1": {
      companyName: "Force Equals",
      matchScore: 72,
      accountStatus: "Not Target"
    }
  };
  
  function getProfileKeyFromUrl() {
    const match = window.location.pathname.match(/\/in\/([^\/?#]+)/);
    return match ? match[1] : null;
  }
  
  function createWidget(data) {
    const widget = document.createElement('div');
    widget.id = 'linkedin-widget';
    widget.innerHTML = `
      <div class="header">
        <strong>${data.companyName}</strong>
        <button id="toggle-btn">Toggle</button>
      </div>
      <div class="score">
        Match Score: ${data.matchScore}
        <div class="progress-bar">
          <div class="progress" style="width: ${data.matchScore}%"></div>
        </div>
      </div>
      <div class="status ${data.accountStatus === "Target" ? "target" : "not-target"}">
        ${data.accountStatus}
      </div>
    `;
    document.body.appendChild(widget);
  
    chrome.storage.sync.get(["widgetVisible"], (result) => {
      const visible = result.widgetVisible ?? true;
      widget.style.display = visible ? "block" : "none";
    });
  
    document.getElementById("toggle-btn").addEventListener("click", () => {
      const current = widget.style.display !== "none";
      const nextState = !current;
      widget.style.display = nextState ? "block" : "none";
      chrome.storage.sync.set({ widgetVisible: nextState });
    });
  }
  
  const profileKey = getProfileKeyFromUrl();
  const profileData = profiles[profileKey];
  
  if (profileData) {
    createWidget(profileData);
  } else {
    console.log("No widget data found for:", profileKey);
  }
  