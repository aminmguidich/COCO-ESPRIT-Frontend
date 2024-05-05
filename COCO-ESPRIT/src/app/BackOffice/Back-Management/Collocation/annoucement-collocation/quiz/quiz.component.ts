import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnoucementCollocationService } from 'src/app/BackOffice/Back-Core/Services/Collocation/annoucement-collocation.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quiz: any = [
    {
      key: 1,
      question: "What is your tolerance for noise during the night?",
      responses: [
        {
          title: "I do not tolerate",
          status: true,
        },
        {
          title: "No problem",
          status: false,
        }
      ]
    },
    {
      key: 2,
      question: "Are you a smoker or not?",
      responses: [
        {
          title: "Yes",
          status: false,
        },
        {
          title: "No",
          status: true,
        }
      ]
    },
    {
      key: 3,
      question: "Do you have pets??",
      responses: [
        {
          title: "No",
          status: true,
        },
        {
          title: "Yes",
          status: false,
        }
      ]
    },

    {
      key: 4,
      question: "Do you prefer to share household chores equally?",
      responses: [
        {
          title: "Yes",
          status: true,
        },
        {
          title: "No",
          status: false,
        }
      ]
    },


    {
      key: 5,
      question: "Are you comfortable with the idea of sharing common goods like food or cleaning products ?",
      responses: [
        {
          title: "Yes",
          status: true,
        },
        {
          title: "No",
          status: false,
        }
      ]
    },


    
    {
      key: 6,
      question: "How do you feel about guests or visitors in the living space during late hours?",
      responses: [
        {
          title: "I prefer limited or no guests late at night",
          status: true,
        },
        {
          title: "I'm comfortable with guests at any hour",
          status: false,
        }
      ]
    },


    {
      key: 7,
      question: "How do you usually solve problems or arguments with roommates about shared living?",
      responses: [
        {
          title: "I like to talk about problems and find solutions",
          status: true,
        },
        {
          title: "I usually try to avoid problems",
          status: false,
        }
      ]
    }



  ]

  score = 0

  answer = ""

  userId = ""

  matchsUsersByScore: any = []

  openMatchesUsers = false

  constructor(
    private Annoucementservice: AnnoucementCollocationService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  selectAnswer(text: any, key: any) {

    const quiz = this.quiz.filter((ele: any) => ele.key === key)

    for (let i = 0; i < quiz[0].responses.length; i++) {

      const resp = quiz[0].responses[i]


      if (resp.title.toLowerCase() == text.toLowerCase() && resp.status === true) {


        this.score++

      }
    }

    console.log("score", this.score)

  }


  generateUsersMatchsScore(score: any) {

    const difference = 2

    this.http.get("http://localhost:9092/api/user/all").subscribe((res: any) => {

      const matchs = []
      const notMatchs = []

      for (let i = 0; i < res.length; i++) {
        if (res[i].id != this.userId) {
          if (score - res[i].score <= difference && score - res[i].score > 0) {
            matchs.push(res[i])
          } else {
            notMatchs.push(res[i])
          }
        }
      }

      for (let i = 0; i < matchs.length; i++) {

        this.matchsUsersByScore.push(matchs[i])

      }

      for (let i = 0; i < notMatchs.length; i++) {

        this.matchsUsersByScore.push(notMatchs[i])

      }

      this.openMatchesUsers = true

    })

  }

  submit() {

    const request = {
      score: this.score
    }

    this.http.put("http://localhost:9092/api/user/updateUserDetails/" + this.userId, request).subscribe({
      next:(res:any)=>{

        this.matchsUsersByScore.push(res)
        alert(this.score + "/" + this.quiz.length)
  
        this.generateUsersMatchsScore(this.score)
  
      },
      error(err) {
          console.log(err)
      },
    })


  }

  ngOnInit(): void {

    this.score = 0

    this.userId = this.route.snapshot.params["id"]


  }


}
