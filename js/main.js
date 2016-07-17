var ignore = ["a", "an", "and", "as", "be", "can", "for", "has", "he", "him", "his", "i", "if", "in", "is", "it", "me", "mine", "of", "on", "that", "the", "this", "to", "with", "you", "your", "yours", "was", "been"],
    similarWords = [
                    ["accept","acceptance","acceptable"],
                    ["achieve","achievement","achievable"],
                    ["act","action","active","actively"],
                    ["act","activity","active","actively"],
                    ["act","activeness","active","actively"],
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
                  ];


$(function() {
    attachEventListener();
});


function attachEventListener() {
  $('#fileInput').on('change', readFile);
  $('#upload-btn').on('click', function(){
    $('#fileInput').click();
  });
  $('#parseInputButton').on('click', readInput);
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


function parseText(text) {
  if(!text) {
    return;
  }
  showChartsContainer();
  var words = text.split(/\s+/);
  var frequencyArray = countFrequency(words);
  // var similarWordsObject = countSimilarWords(words);
  createBarGraph(frequencyArray);
  // createPieChart(wordObject);
  // createSimilarWordsChart(similarWordsObject);
}

function createBarGraph(data) {

  var padding = 5,
      width = $('.chart').width() / 2, //5px padding left and right
      height = 140; //200 - 5px padding top and bottom

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

  var svg = d3.select("#barChart").append("svg")
      .attr("width", width)
      .attr("height", height);
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
      .attr("y", function(d) {return 0; })
      .attr("height", y.bandwidth())
      .attr("x", function(d) { return 0; })
      .attr("width", function(d) { return x(d.frequency); });

  bar.append("text")
      .attr("class", "value")
      .attr("y", y.bandwidth() / 2)
      .attr("dy", ".35em") //vertical align middle
      .attr("text-anchor", "end")
      .attr('fill', '#FFF')
      .text(function(d){
          return (d.frequency);
      })
      .attr("x", function(d){
          var width = this.getBBox().width;
          return Math.max(width + padding, x(d.frequency) - padding);
      });


  svg.attr("width", document.getElementById("barGroup").getBBox().width + 12 * padding)
    .attr("height", document.getElementById("barGroup").getBBox().height + 12 * padding + 100);
  svg.append("g")
      .attr("class", "x axis")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(0," + (document.getElementById("barGroup").getBBox().height + y.bandwidth()) +  ")")
      .call(yAxis);

}


