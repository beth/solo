angular.module('grad', [])
.controller('gradCtrl', function(){

  this.subjectOptions = [
    {name: "Select Subject Area", value: []},
    {name: "Mathematics", value: ['Algebra I', 'Algebra II', 'Geometry', 'Trigonometry', 'Math Analysis', 'Calculus', 'AP Statistics', 'Other']},
    {name: "Laboratory Science", value: ['Biology', 'Chemistry', 'Physics', 'Other']},
    {name: "English", value: ['English I', 'English II', 'English III', 'English IV']},
    {name: "History and Citizenship Skills", value: ['United States History', 'United States Government', 'Oklahoma History', 'Other']},
    {name: "Fine Arts or Speech", value: ['Music', 'Art', 'Drama', 'Speech']},
    {name: "Electives", value: []},
  ];

  this.semesterOptions = ['Semester 1', 'Semester 2'];

  this.gradeOptions = [
    {name: 'A', value: 4, credits: 0.5}, 
    {name: 'B', value: 3, credits: 0.5}, 
    {name: 'C', value: 2, credits: 0.5},
    {name: 'D', value: 1, credits: 0.5},
    {name: 'F', value: 0, credits: 0.5},
    {name: 'IP', value: 0, credits: 0}];

  this.subjectSelected = this.subjectOptions[0];
  this.courseSelected = "";
  this.semesterSelected = "";
  this.gradeSelected = "";
  this.courseTitle = "";

  this.courseList = {
    "Mathematics": [],
    "Laboratory Science":[],
    "English": [],
    "History and Citizenship Skills": [],
    "Fine Arts or Speech": [],
    "Electives":[],
  };

  this.addCourse = function(){
    if(this.courseSelected === 'Other'){
      this.courseSelected = this.subjectSelected.name + ": " + this.courseName;
      this.subjectSelected.name = 'Electives';
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
    this.courseTitle = "";
  };
});
// 

