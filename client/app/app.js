angular.module('grad', [])
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

  //Have array with subject requirements, different data structure for each array? 
  var Course = function(courseTitle, reqForGraduation, creditsRequired){
    this.name = courseTitle;
    this.semesters = [{credit: false, grade: 'NA'}, {credit: false, grade: 'NA'}];
    this.requiredCourse = reqForGraduation;
    this.creditsRequired = creditsRequired || 1;
    this.completed = false;
  };

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
      checkRequirements: function(){
        return false;
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
      checkRequirements: function(){
        return false;
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
      checkRequirements: function(){
          return false;
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
      checkRequirements: function(){
        return false;
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
      checkRequirements: function(){
        return false;
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
      checkRequirements: function(){
        return false;
      }
    },
    {
      name: "Electives", 
      courses: [
        new Course('Other', false)],
      otherCourses: [],
      checkRequirements: function(){

      }
    },
  ];


  // this.subjectOptions = [
  //   {name: "Select Subject Area", value: []},
  //   {name: "Mathematics", value: ['Algebra I', 'Algebra II', 'Geometry', 'Trigonometry', 'Math Analysis', 'Calculus', 'AP Statistics', 'Other']},
  //   {name: "Laboratory Science", value: ['Biology', 'Chemistry', 'Physics', 'Other']},
  //   {name: "English", value: ['English I', 'English II', 'English III', 'English IV']},
  //   {name: "History and Citizenship Skills", value: ['United States History', 'United States Government', 'Oklahoma History', 'Other']},
  //   {name: "Fine Arts or Speech", value: ['Music', 'Art', 'Drama', 'Speech']},
  //   {name: "Foreign Language",  value: ['Input Class Name']},
  //   {name: "Computer Technology", value: ['Input Class Name']},
  //   {name: "Electives", value: ['Input Class Name']},
  // ];

  this.semesterOptions = ['1', '2'];

  this.gradeOptions = [
    {name: 'A', value: 4, credits: 0.5}, 
    {name: 'B', value: 3, credits: 0.5}, 
    {name: 'C', value: 2, credits: 0.5},
    {name: 'D', value: 1, credits: 0.5},
    {name: 'F', value: 0, credits: 0.5},
    {name: 'IP', value: 0, credits: 0}];

  this.subjectSelected = "";
  this.needInputBox = function(){
    return (this.courseSelected === "Other" || this.courseSelected === "Input Class Name");
  }
  // this.courseSelected = "";
  // this.semesterSelected = "";
  // this.gradeSelected = "";
  // this.courseTitle = "";

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
  this.percentMathRequirements = function(){
    var courses = {};
    var mathClasses = this.courseList["Mathematics"];
    for(var k in mathClasses){
      if(mathClasses[k].grade.value>0){
        if(courses.hasOwnProperty(mathClasses[k].course))
          courses[mathClasses[k]] += mathClasses[k].grade.credits;
        else
          courses[mathClasses[k]] = mathClasses[k].grade.credits;
      }
    }
    var credits = 0;
    for(var k in courses){
      if(courses[k]>=1)
        credits++;    
    }
    this.mathPercent = credits/3;
    return credits/3;
  };

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

  this.addCourse = function(){
    //TODO: IF DUPLCIATE, ASK ABOUT OVERWRITING?!
    if(this.courseSelected === 'Other'){
      console.log(this.subjectSelected.name);
      this.courseSelected = this.subjectSelected.name + ": " + this.courseName;
      this.subjectSelected.name = 'Electives';
    }else if(this.courseSelected === 'Input Class Name'){
        this.courseSelected = this.courseName;
    }
    
    this.courseList[this.subjectSelected.name].push({
      course: this.courseSelected,
      semester: this.semesterSelected,
      grade: this.gradeSelected,
    });

    this.subjectSelected = this.subjectOptions[0];
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

