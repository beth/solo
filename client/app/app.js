angular.module('grad', ['ui.bootstrap'])
.controller('gradCtrl', function(){
  //TODO:
  //[x] Make drop downs for EOI 
  //[x] Make data structure for EOI exams 
  //[ ] Make functions that evaluate progress for graduation
  //[x] Make functions that evaluate test progress  
  //[ ] Make information things that show alternatives
  //[ ] Make progress bars
  //[ ] Make log in
  //[ ] Make administrator view 
  //this commit: fixes bug with class name text input

  //Have array with subject requirements, different data structure for each array? 

  var Course = function(courseTitle, reqForGraduation, creditsRequired){
    this.name = courseTitle;
    this.semesters = [{credit: false, grade: 'NA'}, {credit: false, grade: 'NA'}];
    this.requiredCourse = reqForGraduation;
    this.creditsRequired = creditsRequired || 1;
    this.completed = false;
  };

  this.isCourseComplete = function(course){
    var credits = 0;
    if(course.semesters[0].credit)
      credits = credits + 0.5;
    if(course.semesters[1].credit)
      credits = credits + 0.5;
    if(credits === course.creditsRequired){
      course.completed = true;
    }
  };

  this.GPA = {
    creditHours: 18.5,
    points: 50,
    creditsEarned: 18
  };

  this.eoiProgress = .01;
  this.creditProgress = .01;
  this.gpaProgress = 0;
  this.eType = 'info';
  this.cType = 'info';
  this.gType = 'info';
  this.creditMessage = "Not enough information";
  this.eoiMessage = "No tests taken";

  this.progressType = function(val){
    var type;
     if (val < 60) {
      type = 'danger';
    } else if (val < 99) {
      type = 'warning';
    } else
      type = 'success';
 
  return type;
  }

  this.courseOptions = [
    {
      name: "Mathematics", 
      courses: [
        new Course('Algebra I', false), 
        new Course('Algebra II', false), 
        new Course('Geometry', false), 
        new Course('Trigonometry', false), 
        new Course('Math Analysis', false), 
        new Course('Calculus', false),
        new Course('AP Statistics', false),
        new Course('Other', false)],
      otherCourses: [],
      requirementsMet: false,
      requirementMessage: "3 credits needed",
      checkRequirements: function(){
        var credits = 0;
        for(var i = 0; i<this.courses.length; i++){
          if(this.courses[i].completed){
            credits = credits + 1;
          }
        }
        for(var i = 0; i<this.otherCourses.length; i++){
          if(this.otherCourses[i].completed){
            credits = credits + 1;
          }
        }

        if(credits>=3){
          this.requirementsMet = true;
        }
      }
    },
    {
      name: "Laboratory Science",
      courses: [
        new Course('Biology', true),
        new Course('Chemistry', true),
        new Course('Physics', true),
        new Course('Other', false)],
      otherCourses: [],
      requirementsMet: false,
      requirementMessage: "3 credits needed",
      checkRequirements: function(){
        var credits = 0;
        for(var i = 0; i<this.courses.length; i++){
          if(this.courses[i].completed){
            credits = credits + 1;
          }
        }

        for(var i = 0; i<this.otherCourses.length; i++){
          if(this.otherCourses[i].completed){
            credits = credits + 1;
          }
        }

        if(credits>=3){
          this.requirementsMet = true;
        }
      }
    },
    {
      name: "English", 
      courses: [
        new Course('English I', true),
        new Course('English II', true),
        new Course('English III', true),
        new Course('English IV', true)],
      otherCourses: [],
      requirementsMet: false,
      requirementMessage: "4 credits needed",
      checkRequirements: function(){
        var credits = 0;
        for(var i = 0; i<this.courses.length; i++){
          if(this.courses[i].completed){
            credits = credits + 1;
          }
        }

        for(var i = 0; i<this.otherCourses.length; i++){
          if(this.otherCourses[i].completed){
            credits = credits + 1;
          }
        }

        if(credits>=4){
          this.requirementsMet = true;
        }
      }
    },
    {
      name: "History and Citizenship Skills", 
      courses: [
        new Course('United States History', true),
        new Course('United States Government', true, 0.5),
        new Course('Oklahoma History', true, 0.5),
        new Course('Other', false)],
      otherCourses: [],
      requirementsMet: false,
      requirementMessage: "3 credits needed (must include 1 US History, 0.5 OK History, 0.5 US Government)",
      checkRequirements: function(){
       var credits = 0;
        for(var i = 0; i<this.courses.length; i++){
          if(this.courses[i].completed){
            credits = credits + 1;
          }
        }

        for(var i = 0; i<this.otherCourses.length; i++){
          if(this.otherCourses[i].completed){
            credits = credits + 1;
          }
        }

        if(credits>=3){
          this.requirementsMet = true;
        }
      }
    },
    {
      name: "Fine Arts or Speech", 
      courses: [
        new Course('Music', false),
        new Course('Art', false),
        new Course('Drama', false),
        new Course('Speech', false)],
      otherCourses: [],
      requirementsMet: false,
      requirementMessage: "1 credit needed",
      checkRequirements: function(){
        var credits = 0;
        for(var i = 0; i<this.courses.length; i++){
          if(this.courses[i].completed){
            credits = credits + 1;
          }
        }


        for(var i = 0; i<this.otherCourses.length; i++){
          if(this.otherCourses[i].completed){
            credits = credits + 1;
          }
        }
        if(credits>=1){
          this.requirementsMet = true;
        }
      }
    },
    {
      name: "Language/Technology",
      courses: [
        new Course('Spanish I', false),
        new Course('Spanish II', false),
        new Course('Spanish III', false),
        new Course('Spanish IV', false),
        new Course('French I', false),
        new Course('French II', false),
        new Course('French III', false),
        new Course('French IV', false),
        new Course('Computer Tech I', false),
        new Course('Computer Tech II', false)],
      otherCourses: [],
      requirementsMet: false,
      requirementMessage: "2 credits of same language (technology counts as language) needed",
      checkRequirements: function(){
        var credits = 0;
        for(var i = 0; i<this.courses.length; i++){
          if(this.courses[i].completed){
            credits = credits + 1;
          }
        }

        for(var i = 0; i<this.otherCourses.length; i++){
          if(this.otherCourses[i].completed){
            credits = credits + 1;
          }
        }

        if(credits>=2){
          this.requirementsMet = true;
        }
      }
    },
    {
      name: "Electives", 
      courses: [
        new Course('Other', false)],
      otherCourses: [],
      requirementsMet: false,
      requirementMessage: "6 credits not used for other categories needed",
      checkRequirements: function(){
      var credits = 0;
        for(var i = 0; i<this.otherCourses.length; i++){
          if(this.otherCourses[i].completed){
            credits = credits + 1;
          }
        }
        if(credits>=6){
          this.requirementsMet = true;
        }
      }
    },
  ];

  this.semesterOptions = [1, 2];

  this.gradeOptions = [
    {name: 'A', value: 4, credits: 0.5}, 
    {name: 'B', value: 3, credits: 0.5}, 
    {name: 'C', value: 2, credits: 0.5},
    {name: 'D', value: 1, credits: 0.5},
    {name: 'F', value: 0, credits: 0.5},
    {name: 'IP', value: 0, credits: 0}];

  this.subjectSelected = "";
  this.courseSelected = "";
  this.semesterSelected = "";
  this.gradeSelected = "";
  this.courseName = "";

  this.needInputBox = function(){
    if(this.courseSelected.hasOwnProperty('name')){
      return (this.courseSelected.name === "Other");
    }else
      return false;
  }



  this.eoiTests = ['Algebra I', 'Algebra II', 'Geometry', 'English II', 'English III', 'Biology', 'United States History'];

  this.eoiScoreOptions = [
  {name: 'Proficient', value: 2},
  {name: 'Satisfactory', value: 1},
  {name: 'Limited Knowledge', value: 0},
  {name: 'Unsatisfactory', value: -1}];

  this.eoiSelected = "";
  this.scoreSelected = "";


  this.testList = {};
  for(var i =0; i<this.eoiTests.length;i++){
    this.testList[this.eoiTests[i]] = {taken: 0,
      passed: false};
  }
 
  this.creditRequirementsMet = false;
  this.courseRequirementsMet = function(){
    var met = true;
    var metCount = 0;
    for(var i = 0; i<this.courseOptions.length; i++){
      this.courseOptions[i].checkRequirements();
      met = met && this.courseOptions[i].requirementsMet;
      if(this.courseOptions[i].requirementsMet){
        metCount++;
      }
    }
    this.creditRequirementsMet = met;
    this.courseMessage = metCount + " subject area requirements met"
    this.creditProgress = metCount/7*100;
    this.cType = this.progressType(this.creditProgress);
  }

  this.eoiRequirementsMet = false;
  this.eoiRequirements = function(){
    var countPassed = 0;
    var requiredPassed = 0;
    var totalPassed = 0;
    if(this.testList['Algebra I'].passed)
      requiredPassed +=1;
    if(this.testList['English II'].passed)
      requiredPassed +=1;
    for(var k in this.testList){
      if(this.testList[k].passed){
        countPassed++;
      }
    }
    countPassed -= requiredPassed;

    if(countPassed >= 5 && requiredPassed === 1){
      totalPassed = countPassed - 1;
    }else if(countPassed >=5 && requiredPassed === 0){
      totalPassed = countPassed - 2;
    }else
      totalPassed = countPassed + requiredPassed;
    this.eoiMessage = totalPassed + " EOI tests passed";
    this.eoiProgress = totalPassed/5*100;
    this.eType = this.progressType(this.eoiProgress);
    this.eoiRequirementsMet = (requiredPassed && countPassed >=5);
    return (requiredPassed && countPassed >=5);
  };

  this.addCourse = function(){
    //TODO: IF DUPLCIATE, CONFIRM OVERWRITE
    //Default is to overwrite
    var subjectArea = this.subjectSelected;
   
    if(this.courseSelected.name === 'Other'){
      var courseName = this.courseName;
      //Check to see if this course is already in the other class list
      var otherCourse = _.find(subjectArea.otherCourses, function(course){return course.name === courseName});
      //if course is not already in the other class list, make class 
      if(otherCourse === undefined){
        otherCourse = new Course(courseName, false);
        subjectArea.otherCourses.push(otherCourse);
      }
      //Now add credits if grade is high enough
      if(this.gradeSelected.value > 0){
          otherCourse.semesters[this.semesterSelected-1].credit = true;
        }
      otherCourse.semesters[this.semesterSelected-1].grade = this.gradeSelected.name;
      this.isCourseComplete(otherCourse);
    }else{
      if(this.gradeSelected.value > 0){
          this.courseSelected.semesters[this.semesterSelected-1].credit = true;
        }
      this.courseSelected.semesters[this.semesterSelected-1].grade = this.gradeSelected.name;
      this.isCourseComplete(this.courseSelected);
    }
    //Add to gpa
    this.GPA.creditHours += this.gradeSelected.credits;
    this.GPA.points += this.gradeSelected.value*this.gradeSelected.credits;
    if(this.gradeSelected.value>0){
      this.GPA.creditsEarned += this.gradeSelected.credits;
    }
    this.updateGPA();
    //update requirements
    subjectArea.checkRequirements();
    this.courseRequirementsMet();
    //Clear input values
    this.subjectSelected = "";
    this.courseSelected = "";
    this.semesterSelected = "";
    this.gradeSelected = "";
    this.courseName = "";
  };

  this.updateGPA = function(){
    this.overallGPA = this.GPA.points/this.GPA.creditHours;
    this.gpaProgress = this.overallGPA/4*100;
    if(this.overallGPA<1.5){
      this.gType = 'danger';
    }else if(this.overallGPA<2.5){
      this.gType = 'warning';
    }else
      this.gType = 'success';
  }

  this.addTest= function(){
    //Assuming Overwriting Duplicate Tests
    this.testList[this.eoiSelected].taken++;
    this.testList[this.eoiSelected].passed = this.scoreSelected.value > 0 || this.testList[eoiSelected].passed;
    this.eoiSelected = "";
    this.scoreSelected = "";
    this.eoiRequirements(); 
  };

  //fake data!
  this.courseOptions[0].courses = [{"name":"Algebra I","semesters":[{"credit":true,"grade":"C"},{"credit":false,"grade":"F"}],"requiredCourse":false,"creditsRequired":1,"completed":false},{"name":"Algebra II","semesters":[{"credit":true,"grade":"C"},{"credit":false,"grade":"NA"}],"requiredCourse":false,"creditsRequired":1,"completed":false},{"name":"Geometry","semesters":[{"credit":true,"grade":"D"},{"credit":true,"grade":"C"}],"requiredCourse":false,"creditsRequired":1,"completed":true},{"name":"Trigonometry","semesters":[{"credit":false,"grade":"NA"},{"credit":false,"grade":"NA"}],"requiredCourse":false,"creditsRequired":1,"completed":false},{"name":"Math Analysis","semesters":[{"credit":false,"grade":"NA"},{"credit":false,"grade":"NA"}],"requiredCourse":false,"creditsRequired":1,"completed":false},{"name":"Calculus","semesters":[{"credit":false,"grade":"NA"},{"credit":false,"grade":"NA"}],"requiredCourse":false,"creditsRequired":1,"completed":false},{"name":"AP Statistics","semesters":[{"credit":false,"grade":"NA"},{"credit":false,"grade":"NA"}],"requiredCourse":false,"creditsRequired":1,"completed":false},{"name":"Other","semesters":[{"credit":false,"grade":"NA"},{"credit":false,"grade":"NA"}],"requiredCourse":false,"creditsRequired":1,"completed":false}];
  this.courseOptions[1].courses = [{"name":"Biology","semesters":[{"credit":true,"grade":"D"},{"credit":true,"grade":"B"}],"requiredCourse":true,"creditsRequired":1,"completed":true},{"name":"Chemistry","semesters":[{"credit":true,"grade":"B"},{"credit":true,"grade":"A"}],"requiredCourse":true,"creditsRequired":1,"completed":true},{"name":"Physics","semesters":[{"credit":false,"grade":"NA"},{"credit":false,"grade":"NA"}],"requiredCourse":true,"creditsRequired":1,"completed":false},{"name":"Other","semesters":[{"credit":false,"grade":"NA"},{"credit":false,"grade":"NA"}],"requiredCourse":false,"creditsRequired":1,"completed":false}];
  this.courseOptions[1].otherCourses = [{"name":"Anatomy","semesters":[{"credit":true,"grade":"B"},{"credit":true,"grade":"B"}],"requiredCourse":false,"creditsRequired":1,"completed":true}];
  this.courseOptions[2].courses = [{"name":"English I","semesters":[{"credit":true,"grade":"D"},{"credit":true,"grade":"C"}],"requiredCourse":true,"creditsRequired":1,"completed":true},{"name":"English II","semesters":[{"credit":true,"grade":"B"},{"credit":true,"grade":"B"}],"requiredCourse":true,"creditsRequired":1,"completed":true},{"name":"English III","semesters":[{"credit":true,"grade":"B"},{"credit":true,"grade":"B"}],"requiredCourse":true,"creditsRequired":1,"completed":true},{"name":"English IV","semesters":[{"credit":true,"grade":"A"},{"credit":false,"grade":"NA"}],"requiredCourse":true,"creditsRequired":1,"completed":false}];
  this.courseOptions[3].courses = [{"name":"United States History","semesters":[{"credit":true,"grade":"A"},{"credit":true,"grade":"B"}],"requiredCourse":true,"creditsRequired":1,"completed":true},{"name":"United States Government","semesters":[{"credit":true,"grade":"B"},{"credit":false,"grade":"NA"}],"requiredCourse":true,"creditsRequired":0.5,"completed":true},{"name":"Oklahoma History","semesters":[{"credit":true,"grade":"B"},{"credit":false,"grade":"NA"}],"requiredCourse":true,"creditsRequired":0.5,"completed":true},{"name":"Other","semesters":[{"credit":false,"grade":"NA"},{"credit":false,"grade":"NA"}],"requiredCourse":false,"creditsRequired":1,"completed":false}];
  this.courseOptions[4].courses = [{"name":"Music","semesters":[{"credit":true,"grade":"B"},{"credit":true,"grade":"B"}],"requiredCourse":false,"creditsRequired":1,"completed":true},{"name":"Art","semesters":[{"credit":false,"grade":"NA"},{"credit":false,"grade":"NA"}],"requiredCourse":false,"creditsRequired":1,"completed":false},{"name":"Drama","semesters":[{"credit":false,"grade":"NA"},{"credit":false,"grade":"NA"}],"requiredCourse":false,"creditsRequired":1,"completed":false},{"name":"Speech","semesters":[{"credit":false,"grade":"NA"},{"credit":false,"grade":"NA"}],"requiredCourse":false,"creditsRequired":1,"completed":false}];
  this.courseOptions[5].courses = [{"name":"Spanish I","semesters":[{"credit":true,"grade":"A"},{"credit":true,"grade":"B"}],"requiredCourse":false,"creditsRequired":1,"completed":true},{"name":"Spanish II","semesters":[{"credit":true,"grade":"A"},{"credit":true,"grade":"C"}],"requiredCourse":false,"creditsRequired":1,"completed":true},{"name":"Spanish III","semesters":[{"credit":false,"grade":"NA"},{"credit":false,"grade":"NA"}],"requiredCourse":false,"creditsRequired":1,"completed":false},{"name":"Spanish IV","semesters":[{"credit":false,"grade":"NA"},{"credit":false,"grade":"NA"}],"requiredCourse":false,"creditsRequired":1,"completed":false},{"name":"French I","semesters":[{"credit":false,"grade":"NA"},{"credit":false,"grade":"NA"}],"requiredCourse":false,"creditsRequired":1,"completed":false},{"name":"French II","semesters":[{"credit":false,"grade":"NA"},{"credit":false,"grade":"NA"}],"requiredCourse":false,"creditsRequired":1,"completed":false},{"name":"French III","semesters":[{"credit":false,"grade":"NA"},{"credit":false,"grade":"NA"}],"requiredCourse":false,"creditsRequired":1,"completed":false},{"name":"French IV","semesters":[{"credit":false,"grade":"NA"},{"credit":false,"grade":"NA"}],"requiredCourse":false,"creditsRequired":1,"completed":false},{"name":"Computer Tech I","semesters":[{"credit":false,"grade":"NA"},{"credit":false,"grade":"NA"}],"requiredCourse":false,"creditsRequired":1,"completed":false},{"name":"Computer Tech II","semesters":[{"credit":false,"grade":"NA"},{"credit":false,"grade":"NA"}],"requiredCourse":false,"creditsRequired":1,"completed":false}];
  this.courseOptions[6].courses = [{"name":"Other","semesters":[{"credit":false,"grade":"NA"},{"credit":false,"grade":"NA"}],"requiredCourse":false,"creditsRequired":1,"completed":false}];
  this.courseOptions[6].otherCourses = [{"name":"Music Appreciation","semesters":[{"credit":true,"grade":"A"},{"credit":true,"grade":"B"}],"requiredCourse":false,"creditsRequired":1,"completed":true},{"name":"Basketball","semesters":[{"credit":true,"grade":"B"},{"credit":true,"grade":"B"}],"requiredCourse":false,"creditsRequired":1,"completed":true},{"name":"Physical Education","semesters":[{"credit":true,"grade":"D"},{"credit":true,"grade":"B"}],"requiredCourse":false,"creditsRequired":1,"completed":true},{"name":"Culinary Arts I","semesters":[{"credit":true,"grade":"B"},{"credit":true,"grade":"C"}],"requiredCourse":false,"creditsRequired":1,"completed":true},{"name":"Culinary Arts II","semesters":[{"credit":true,"grade":"A"},{"credit":true,"grade":"C"}],"requiredCourse":false,"creditsRequired":1,"completed":true}];
  this.courseRequirementsMet();
  this.updateGPA();
});
// 

