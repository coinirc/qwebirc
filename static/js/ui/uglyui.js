function UglyUI(parent) {
  var self = this;
  var active;
  
  var tabs = new Element("div", {"styles": { "border": "1px solid black", "padding": "4px" } });
  parent.appendChild(tabs);
  var tabhash = {};
  
  var window = new Element("div", {"styles": { "border": "1px solid black", "margin": "2px 0px 0px 0px", "height": "480px" } });
  parent.appendChild(window);
  
  var form = new Element("form");
  var inputbox = new Element("input", {"styles": { "width": "400px", "border": "1px solid black", "margin": "2px 0px 0px 0px"} });
  
  form.addEvent("submit", function(e) {
    new Event(e).stop();
    
    self.send(inputbox.value);
    inputbox.value = "";
  });
  parent.appendChild(form);  
  form.appendChild(inputbox);
  inputbox.focus();

  this.newWindow = function(windowname, displayname) {
    var container = new Element("div", { "styles": { "display": "none" } });
    window.appendChild(container);
    
    var nicklist;
    var topic;
    
    if(windowname != "") {
      nicklist = new Element("div", {"styles": { "border-left": "1px solid black", "width": "125px", "float": "right", "height": "480px", "clear": "both", "overflow": "auto", "background": "white"} });
      container.appendChild(nicklist);
    }
      
    var x = new Element("div", {"styles": { "height": "480px" }});
    container.appendChild(x);

    if(windowname != "") {
      topic = new Element("div", {"styles": { "background": "#fef", "height": "20px" } });
      x.appendChild(topic);      
    }
    
    var e = new Element("div", {"styles": { "height": "460px", "overflow": "auto", "word-wrap": "break-word" }});
    x.appendChild(e);

    var tab = new Element("span", {"styles": { "border": "1px black solid", "padding": "2px", "cursor": "default", "margin-right": "2px", "background": "#eee", "clear": "both" } });
    if(displayname) {
      tab.appendText(displayname);
    } else {
      tab.appendText(windowname);
    }
    tab.addEvent("click", function() {
      self.selectTab(windowname);
    });
    tabs.appendChild(tab);
    
    tabhash[windowname] = { "container": container, "tab": tab, "element": e, "lastcolour": false, "nicklist": nicklist, "topic": topic };
    
    self.selectTab(windowname);
    
    return tabhash[windowname];
  }
  
  this.updateNickList = function(windowname, nicks) {
    var w = tabhash[windowname];
    var n = w.nicklist;
    
    while(n.firstChild)
      n.removeChild(n.firstChild);

    forEach(nicks, function(nick) {
      var e = document.createElement("div");
      n.appendChild(e);
      e.appendChild(document.createTextNode(nick));
    });
  }
  
  this.updateTopic = function(windowname, topic) {
    var w = tabhash[windowname];
    var t = w.topic;
    
    while(t.firstChild)
      t.removeChild(t.firstChild);

    t.appendChild(document.createTextNode(topic));
  }
  
  this.selectTab = function(windowname) {
    for(var i in tabhash) {
      var o = tabhash[i];
      o.container.setStyle("display", "none");
      o.tab.setStyle("background", "#eee");
    }
    
    tabhash[windowname].container.setStyle("display", "block");
    tabhash[windowname].tab.setStyle("background", "#dff");
    tabhash[windowname].tab.setStyle("color", "");
    self.active = windowname;
  }
  
  this.newLine = function(windowname, line) {
    var window = tabhash[windowname];
    if(!window)
      window = this.newWindow(windowname);
    
    var wx = window;
    window = window.element;
    if(wx.lastcolour) {
      c = "#efefef";
    } else {
      c = "#eeffff";
    }
    
    var e = new Element("div", { "styles": { "background": c } });
    e.appendText(line);
    
    wx.lastcolour = !wx.lastcolour;
    window.appendChild(e);
    
    if(windowname != self.active)
      wx.tab.setStyle("color", "red");
  }
}