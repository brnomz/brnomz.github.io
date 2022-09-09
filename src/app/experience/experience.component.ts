import { Component, OnInit } from '@angular/core'
import { PrimeIcons } from 'primeng/api'

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  events: any[] = []

  ngOnInit (): void {
    this.events = [
      {
        company: 'Mercury',
        url: 'https://www.mercury.co.nz',
        date: 'August 2021 - Present',
        icon: PrimeIcons.CIRCLE,
        image: 'assets/images/mercury.svg',
        color: '#85929e',
        description:
          'I am currently working as a Technical Lead in the Digital and Integration space. I work closely with our Enterprise Solution Architects and Software Developers to ensure our enterprise solutions are fit-for-purpose in regards to design, integration, security and scalability to enable us to deliver high-quality Web and Mobile products for our customers'
      },
      {
        company: 'Vivo (Telefonica Brazil)',
        url: 'https://www.vivo.com.br',
        location: 'Sao Paulo (Brazil)',
        date: 'April 2020 - May 2021',
        icon: PrimeIcons.CIRCLE,
        image: 'assets/images/vivo.svg',
        color: '#85929e',
        description:
          "I have worked as a Cloud and DevOps Manager for Vivo to help establish Vivo's DevOps framework to support CI/CD pipelines for ICT teams. I have also helped Vivo define its enterprise cloud strategy for the next few years as part of the Telefonica-Microsoft agreement to help them shift on-premise resources over to Microsoft Azure"
      },
      {
        company: 'Accenture New Zealand',
        date: 'July 2016 - March 2020',
        url: 'https://www.accenture.com/nz-en/about/company/new-zealand',
        icon: PrimeIcons.CIRCLE,
        image: 'assets/images/accenture.svg',
        color: '#85929e',
        description:
          "During my 3 years tenure with Acceture New Zealand, I was involved in inumerous projects to support Accenture' clients predominantly in the Health and Public sectors across New Zealand. The projects would involve different roles with many different focus such as Solution Architecture, Integration, Testing and DevOps"
      },
      {
        company: 'Accenture Brazil',
        date: 'March 2007 - July 2016',
        url: 'https://www.accenture.com/br-pt',
        icon: PrimeIcons.CIRCLE,
        image: 'assets/images/accenture.svg',
        color: '#85929e',
        description:
          'I have started my career as a Test Analyst back in 2007 moving to Software Development and Integration a few years later. After 9 years of experience working for multiple clients and projects across different locations within the LATAM region, I was offered a relocation to New Zealand to participate in a major business transformation project for a government agency in Wellington'
      }
    ]
  }
}
