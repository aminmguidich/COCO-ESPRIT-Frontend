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
          status: true,
        },
        {
          title: "non",
          status: false,
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
      key: 3,
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
      key: 3,
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

  constructor(
    private Annoucementservice: AnnoucementCollocationService,
    private route:ActivatedRoute
) { }

  selectAnswer(text: any, key: any) {

    const quiz = this.quiz.filter((ele: any) => ele.key === key)

    for (let i = 0; i < quiz[0].responses.length; i++) {

      const resp = quiz[0].responses[i]

      if (resp.title === text.target.value && resp.status === true) {

        this.score++

      }
    }

  }

  submit() {

    const request = {
      score:this.score
    }

    this.Annoucementservice.updateUsers(request,this.userId).subscribe((res:any)=>{

      console.log(res)

    })

    alert(this.score)

  }

  ngOnInit(): void {

    this.userId = this.route.snapshot.params["id"]

  }


}
