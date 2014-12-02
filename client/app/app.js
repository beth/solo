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

  Course.prototype.isComplete = function(){
    var credits = 0;
    if(this.semesters[0].credit)
      credits = credits + 0.5;
    if(this.semesters[1].credit)
      credits = credits + 0.5;
    if(credits === this.creditsRequired){
      this.completed = true;
    }
  };

  this.GPA = {
    creditsHours: 0,
    points: 0};


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
      checkRequirements: function(){
        //just need three credits of math
        var credits = 0;
        for(var i = 0; i<this.courses.length; i++){
          if(this.courses[i].completed){
            credits = credits + 1;
          }
        }
        if(credits>=0){
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
      checkRequirements: function(){
        var credits = 0;
        for(var i = 0; i<this.courses.length; i++){
          if(this.courses[i].completed){
            credits = credits + 1;
          }
        }
        if(credits>=0){
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
      checkRequirements: function(){
        var credits = 0;
        for(var i = 0; i<this.courses.length; i++){
          if(this.courses[i].completed){
            credits = credits + 1;
          }
        }
        if(credits>=0){
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
      checkRequirements: function(){
       var credits = 0;
        for(var i = 0; i<this.courses.length; i++){
          if(this.courses[i].completed){
            credits = credits + 1;
          }
        }
        if(credits>=0){
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
      checkRequirements: function(){
        var credits = 0;
        for(var i = 0; i<this.courses.length; i++){
          if(this.courses[i].completed){
            credits = credits + 1;
          }
        }
        if(credits>=0){
          this.requirementsMet = true;
        }
      }
    },
    {
      name: "Foreign Language or Computer Technology",
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
      checkRequirements: function(){
        var credits = 0;
        for(var i = 0; i<this.courses.length; i++){
          if(this.courses[i].completed){
            credits = credits + 1;
          }
        }
        if(credits>=0){
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
      checkRequirements: function(){
      var credits = 0;
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


  this.courseList = {
    "Mathematics": [],
    "Laboratory Science":[],
    "English": [],
    "History and Citizenship Skills": [],
    "Fine Arts or Speech": [],
    "Foreign Language": [],
    "Computer Technology": [],
    "Electives":[]
  };


  this.testList = {};
  for(var i =0; i<this.eoiTests.length;i++){
    this.testList[this.eoiTests[i]] = {taken: 0,
      passed: false};
  }
 
  this.creditRequirementsMet = false;


  this.courseRequirementsMet = function(){
    var met = true;
    for(var i = 0; i<this.courseOptions.length; i++){
      met = met && this.courseOptions[i].requirementsMet;
    }
    this.creditRequirementsMet = met;
  }

  this.eoiRequirementsMet = false;
  this.eoiRequirements = function(){
    var countPassed = 0;
    var requiredPassed = false;
    if(this.testList['Algebra I'].passed && this.testList['English II'].passed){
      requiredPassed = true;
    }
    for(var k in this.testList){
      if(this.testList[k].passed){
        countPassed++;
      }
    }

    this.eoiRequirementsMet = (requiredPassed && countPassed >=5);
    return (requiredPassed && countPassed >=5);
  };
  this.consoleLog = "";
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
      otherCourse.isComplete();
    }else{
      // var courseName = this.courseSelected.name;
      // var modCourse = _.find(subjectArea.courses, function(course){return course.name === courseName});
      // this.consoleLog = "IN ELSE " + modCourse;
      // if(this.gradeSelected.value > 0){
      //     modCourse.semesters[this.semesterSelected-1].credit = true;
      //   }
      // modCourse.semesters[this.semesterSelected-1].grade = this.gradeSelected.name;

      if(this.gradeSelected.value > 0){
          this.courseSelected.semesters[this.semesterSelected-1].credit = true;
        }
      this.courseSelected.semesters[this.semesterSelected-1].grade = this.gradeSelected.name;
      this.courseSelected.isComplete();
    }
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

  this.addTest= function(){
    //Assuming Overwriting Duplicate Tests
    this.testList[this.eoiSelected].taken++;
    this.testList[this.eoiSelected].passed = this.scoreSelected.value > 0 || this.testList[eoiSelected].passed;
    this.eoiSelected = "";
    this.scoreSelected = "";
    this.eoiRequirements(); 
  };
});
// 

