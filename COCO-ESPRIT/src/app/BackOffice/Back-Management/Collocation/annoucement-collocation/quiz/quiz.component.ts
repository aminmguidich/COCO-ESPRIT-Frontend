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
      question: "Quelle est votre tolérance au bruit pendant la nuit ?",
      responses: [
        {
          title: "je ne tolére pas",
          status: true,
        },
        {
          title: "Pas de Probléme",
          status: false,
        }
      ]
    },
    {
      key: 2,
      question: "Êtes-vous fumeur ou non?",
      responses: [
        {
          title: "oui",
          status: false,
        },
        {
          title: "non",
          status: true,
        }
      ]
    },
    {
      key: 3,
      question: "Avez-vous des animaux de compagnie ?",
      responses: [
        {
          title: "non",
          status: true,
        },
        {
          title: "oui",
          status: false,
        }
      ]
    },

    {
      key: 4,
      question: "Préférez-vous partager les tâches ménagères de manière équitable ?",
      responses: [
        {
          title: "oui",
          status: true,
        },
        {
          title: "Non",
          status: false,
        }
      ]
    },


    {
      key: 5,
      question: "Êtes-vous à l'aise avec l'idée de partager des biens communs comme la nourriture ou les produits de nettoyage ?",
      responses: [
        {
          title: "oui",
          status: true,
        },
        {
          title: "non",
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
