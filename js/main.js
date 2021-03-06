var ignore = ["a", "an", "and", "as", "be", "can", "for", "has", "he", "him", "his", "i", "if", "in", "is", "it", "me", "mine", "of", "on", "that", "the", "this", "to", "with", "you", "your", "yours", "was", "been"],
    similarWords = [
                    ["accept","acceptance","acceptable"],
                    ["achieve","achievement","achievable"],
                    ["act","action","active","actively", "activity", "activeness"],
                    ["add","addition","additional"],
                    ["adjust","adjustment","adjustable"], 
                    ["admire","admiration","admirable"],
                    ["advise","advice","advisable"],
                    ["amass","mass","massive","massively"],
                    ["amazed","amazement","amazing"], 
                    ["amuse","amusement","amusing"],
                    ["annoy","annoyance","annoying"],
                    ["approach","approach","approachable"],
                    ["attend","attention","attentive"],
                    ["attract","attraction","attractive"],
                    ["avoid","avoidance","avoidable"],
                    ["believe","belief","believable"],
                    ["blacken","blackness","black"],
                    ["bleed","blood","bloody"],
                    ["bore","boredom","boring"],
                    ["bother","botheration","bothering"],
                    ["breathe","breath","breathing"],
                    ["bury","burial","buried"],
                    ["care","care","careful","carefully"],
                    ["challenge","challenge","challenging"],
                    ["chase","chase","chasing"],
                    ["cheer","cheerfulness","cheerful","cheerfully"],
                    ["choose","choice","chosen"],
                    ["clear","clarity","clear","clearly"],
                    ["collect","collection","collective","collectively"],
                    ["comfort","comfort","comfortable","comfortably"],
                    ["complex","complexity","complex"],
                    ["confuse","confusion","confused"],
                    ["consider","consideration","considerable","considerably"],
                    ["console","consolation","consoled"],
                    ["continue","continuity","continuous","continuously"],
                    ["craze","craze","crazy","crazily"],
                    ["create","creation","creative","creatively"],
                    ["credit","credit","creditable","creditably"],
                    ["cure","cure","curable"],
                    ["curse","curse","cursed"],
                    ["damage","damage","damaged"], 
                    ["deafen","deafness","deaf"],
                    ["decide","decision","decisive"],
                    ["decorate","decoration","decorative"],
                    ["delight","delight","delightful","delightfully"],
                    ["demand","demand","demanding"],
                    ["derive","derivation","derivative"],
                    ["deserve","deserve","deserving"],
                    ["destroy","destruction","destructive","destructively"],
                    ["develop","development","developing"],
                    ["die","death","dead"],
                    ["differ","difference","different","differently"],
                    ["disturb","disturbance","disturbing"],
                    ["dust","dust","dusty"],
                    ["educate","education","educative"],
                    ["embarrass","embarrassment","embarrassing"], 
                    ["empower","power","powerful","powerfully"],
                    ["empty","emptiness","empty"],
                    ["encircle","circle","circular","circularly"],
                    ["encourage","courage","courageous","courageously"],
                    ["endanger","danger","dangerous","dangerously"],
                    ["enthuse","enthusiasm","enthusiastic"],
                    ["enumerate","number","numerable"],
                    ["envy","envy","envious","enviously"],
                    ["evaporate","evaporation","evaporating"],
                    ["expect","expectation","expected","expectedly"],
                    ["explain","explanation","explainable"],
                    ["explore","exploration","exploring"], 
                    ["fascinate","fascination","fascinating"],
                    ["feed","food"],
                    ["firm","firmness","firm","firmly"],
                    ["fly","flight","flying"],
                    ["force","force","forceful","forcefully"],
                    ["glorify","glory","glorious","gloriously"],
                    ["grow","growth","growing","growingly"],
                    ["harm","harm","harmful","harmfully"],
                    ["hate","hatred","hateful","hatefully"],
                    ["heal","health","healthy","healthily"],
                    ["hope","hope","hopeful","hopefully"],
                    ["identify","identification","indentified"],
                    ["identify","identity","indentifying"],
                    ["imitate","imitation","imitative","imitatively"],
                    ["impress","impression","impressive","impressively"],
                    ["include","inclusion","inclusive","inclusively"],
                    ["indicate","indication","indicative","indicatively"],
                    ["inform","information","informative"],
                    ["inhabit","habitat","inhabitant"],
                    ["injure","injury","injurious","injuriously"],
                    ["inquire","inquiry","inquiring"],
                    ["instruct","instruction","instructive"],
                    ["insult","insult","insulting","insultingly"],
                    ["intent","intention","intentional","intentionally"],
                    ["interfere","interference","interfering"],
                    ["introduce","introduction","introductory"],
                    ["invent","invention","inventive"], 
                    ["irritate","irritation","irritating","irritatingly"],
                    ["lead","leadership","leading","leadingly"],
                    ["live","life","lively","livingly"],
                    ["live","life","alive","livingly"],
                    ["live","liveliness","lively","livingly"],
                    ["lose","loss","lost"],
                    ["madden","madness","mad","madly"],
                    ["migrate","migration","migrating"], 
                    ["modernise","modernity","modern"],
                    ["moisten","moisture","moistures"],
                    ["monotonies","monotony","monotonous","monotonously"],
                    ["move","movement","movable","movingly"],
                    ["narrow","narrowness","narrow"],
                    ["nationalise","nationality","national","nationwide"],
                    ["observe","observation","observatory"],
                    ["own","ownership","own"],
                    ["partner", "partnership", "partners"],
                    ["perform","performance","performing"],
                    ["permit","permission","permissible "],
                    ["persuade","persuasion","persuasive"],
                    ["please","pleasure","pleasant"],
                    ["popularise","popularity","popular"],
                    ["quicken","quickness","quick","quickly"],
                    ["redden","redness","red "],
                    ["sadden","sadness","sad","sadly"],
                    ["secure","security","secured","securely"],
                    ["see","scene","scenic"], 
                    ["see","sight","seen"],
                    ["speed","speed","speedy","speedily"],
                    ["whiten","whiteness","white"],
                    ["badness","bad","badly"],
                    ["terror", "terrorist", "terrorism"]
                  ],
                  frequencyArray, similarWords;

function addClass(el, className) { 
  if (!el || el.className === null || hasClass(el, className)) {
    return;
  }
  el.className += ' ' + className + ' ';
}

function hasClass(el, className) {
    return el && el.className && el.className.contains(className);
}


$(function() {
    attachEventListener();
    hideChartsContainer();
});


function attachEventListener() {
  $('#fileInput').on('change', readFile);
  $('#upload-btn').on('click', function(){
    $('#fileInput').click();
  });
  $('#parseInputButton').on('click', readInput);
  window.addEventListener('resize', handleResize);
}

var lastTimeout;
function handleResize() {
  if(lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(createGraphs, 250);
}


function readFile(e) {
  var file = e.target.files[0];
  var textType = /text.*/;

  if (file.type.match(textType)) {
      var reader = new FileReader();

      reader.onload = function(e) {
        $('#fileInput').val(null);
        parseText(reader.result);
      }

      reader.readAsText(file);    
  } else {
      alert('file not supported');
  }
}

function readInput() {
  var textArea = $('#textInput');
  var textInput = textArea.val();
  if(!textInput) {
    alert('Enter valid text');
    return;
  }
  textArea.val('');
  parseText(textInput);
}

function countFrequency(words) {
  var nameMap = {};
  for(var i = 0; i < words.length; i++) {
    if(ignore.indexOf(words[i]) !== -1) {
      continue;
    }
    if(!nameMap[words[i]]) {
      nameMap[words[i]] = 1;
    } else {
      nameMap[words[i]] += 1;
    }
  }
  var array = [];
  Object.keys(nameMap).forEach(function(key){
    array.push({word: key, frequency: nameMap[key]});
  });
  array = array.sort(function(a, b){return b.frequency - a.frequency;})
  return array;
}


function showChartsContainer() {
  $('.form-container').hide();
  $('.charts-container').show();
}

function hideChartsContainer() {
  $('.form-container').show();
  $('.charts-container').hide();
}


function parseText(text) {
  if(!text) {
    return;
  }
  showChartsContainer();
  var words = text.split(/\s+/);
  frequencyArray = countFrequency(words),
  similarWords = countSimilarWords(frequencyArray);
  createGraphs();
}

function createGraphs() {
  if(!frequencyArray || !similarWords) {
    return;
  }
  clearHtml();
  createBarGraph(frequencyArray);
  createPieChart(getPopularWords(frequencyArray));
  createSimilarWordsChart(similarWords);
}

function clearHtml() {
  document.getElementById('barChart').innerHTML = '';
  document.getElementById('pieChart').innerHTML = '';
  document.getElementById('similarWordsChart').innerHTML = '';
}

function getPopularWords(frequencyArray) {
  return frequencyArray.filter(function(datum){
    return datum.frequency > 2;
  });
}

function getSimilarWord(word) {
  var toBeReturned;
  for(var i = 0; i < similarWords.length; i++) {
    if(similarWords[i].indexOf(word) > -1) {
      toBeReturned = similarWords[i];
      break;
    }
  }
  return toBeReturned;
}

function countSimilarWords(data) {
  var toBeReturned = {};
  for(var i = 0; i < data.length; i++) {
    var similarArray = getSimilarWord(data[i].word);
    if(!similarArray) {
      continue;
    }
    if(!toBeReturned[similarArray[0]]) {
      toBeReturned[similarArray[0]]  = {
        array: similarArray,
        frequency: data[i].frequency
      }
    } else {
      toBeReturned[similarArray[0]].frequency += 1;
    }
  }
  return toBeReturned;
}

function createBarGraph(data) {

  var padding = 5,
      width = $('.chart').width() / 2, //5px padding left and right
      height = $('.chart').height() - 2 * padding; //200 - 5px padding top and bottom

  var y = d3.scaleBand()
      .range([0, width])
      .round(true)
      .padding(.1);

  var x = d3.scaleLinear()
      .range([0, width]);

  var yAxis = d3.axisBottom()
      .scale(x);

  var xAxis = d3.axisLeft()
      .scale(y)
      .ticks(10);

  var svg = d3.select("#barChart").append("svg");
  var g = svg
          .append("g")
          .attr('id', 'barGroup')
          .attr("transform", "translate(" +  0 + "," + 0 + ")");

  y.domain(data.map(function(d) { return d.word; }));
  x.domain([0, d3.max(data, function(d) {return d.frequency; })]);

  var bar = g.selectAll(".bar")
      .data(data)
      .enter().append('g')
      .attr("cx",0)
      .attr("transform", function(d, i) {
        return "translate(" + 0 + "," + y(d.word) + ")";
      });

  bar.append("rect")
      .attr("class", "bar")
      .attr('fill', '#2E784B')
      .attr("y", function(d) {return 0; })
      .attr("height", y.bandwidth())
      .attr("x", function(d) { return 0; })
      .attr("width", function(d) { return x(d.frequency); });

  bar.append("text")
      .attr("class", "value")
      .attr("y", y.bandwidth() / 2)
      .attr("dy", ".35em") //vertical align middle
      .attr("text-anchor", "end")
      .attr('fill', '#000')
      .text(function(d){
          return (d.frequency);
      })
      .attr("x", function(d){
          var width = this.getBBox().width;
          return Math.max(width + padding, x(d.frequency) + 2 * padding);
      });


  svg.attr("width", document.getElementById("barGroup").getBBox().width )
    .attr("height", document.getElementById("barGroup").getBBox().height + 12 * padding);

  svg.append("g")
      .attr("class", "x axis")
      .call(xAxis);
  var xAxisBBox = document.querySelector("#barChart .x.axis").getBBox();
  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(0," + (xAxisBBox.height + xAxisBBox.y) +  ")")
      .call(yAxis);

}

function createPieChart(data) {

 var padding = 5,
    width = $('.chart').width() / 2, //5px padding left and right
    height = $('.chart').height() - 2 * padding; 
    radius = Math.min(width, height) / 2;

  var color = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];

  var arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

  var labelArc = d3.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

  var pie = d3.pie()
      .sort(null)
      .value(function(d) { return d.frequency; });

  var svg = d3.select("#pieChart").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color[Math.floor(Math.random() * color.length)]; });

  g.append("text")
      .attr("dy", ".35em")
      .attr('fill', '#000')
      .text(function(d) { return d.data.word + '(' + d.data.frequency + ')'; })
      .attr("transform", function(d, i) {
          var c = labelArc.centroid(d),
              x = c[0],
              y = c[1],
              // pythagorean theorem for hypotenuse
              h = Math.sqrt(x*x + y*y);
              return "translate(" + ((x/h * radius) + padding) +  ',' + ((y/h * radius) + padding) +  ")"; 
      })
      .attr("text-anchor", function(d) {
        return (d.endAngle + d.startAngle)/2 > Math.PI ? "end" : "start";
      })
      .attr('font-size', '9px');
}

function createElement(type) {
  return document.createElement(type);
}

function createSimilarWordsChart(data) {
  if(!data || !Object.keys(data).length) {
    return;
  }
  var keys = Object.keys(data);
  var mainContainer = createElement('div');
  addClass(mainContainer, 'similar-words flex');
  keys.forEach(function(key){
    var container = createElement('div');
    addClass(container, 'similar-word-container');
    var img = createElement('img');
    img.src = 'assets/images/' + key + '.png';
    container.appendChild(img);
    var frequencyText = createElement('span');
    addClass(frequencyText, 'similar-word-frequency');
    frequencyText.innerHTML = data[key].frequency;
    container.appendChild(frequencyText);
    var similarWordsArray = createElement('span');
    addClass(similarWordsArray, 'similar-words-collection');
    similarWordsArray.innerHTML = data[key].array.join('/');
    container.appendChild(similarWordsArray);
    mainContainer.appendChild(container);
  });
  document.getElementById('similarWordsChart').appendChild(mainContainer);
}


