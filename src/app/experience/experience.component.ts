import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  events: any[] = [];

  ngOnInit(): void {
    this.events = [
      {
        company: 'Mercury',
        url: 'https://www.mercury.co.nz',
        date: 'August 2021 - Present',
        icon: PrimeIcons.CIRCLE,
        image: 'assets/images/mercury.svg',
        color: '#85929e',
        description:
          'I am currently working as a Solution Architect in the Digital workstream. I collaborate closely with our Enterprise Solution Architects and Software Developers to ensure that our enterprise solutions adhere to the best design, integration, security, and scalability patterns. This enables us to deliver high-quality web and mobile applications to our customers.',
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
          "I worked as a Cloud and DevOps Manager at Vivo, aiding in the establishment of Vivo's DevOps framework to bolster CI/CD pipelines for ICT teams. Additionally, I contributed to defining Vivo's enterprise cloud strategy for the upcoming years, aligning with the Telefonica-Microsoft agreement to facilitate the migration of on-premise resources to Microsoft Azure.",
      },
      {
        company: 'Accenture New Zealand',
        date: 'July 2016 - March 2020',
        url: 'https://www.accenture.com/nz-en/about/company/new-zealand',
        icon: PrimeIcons.CIRCLE,
        image: 'assets/images/accenture.svg',
        color: '#85929e',
        description:
          "During my 3-year tenure with Accenture New Zealand, I was involved in numerous projects aimed at supporting Accenture's clients, primarily in the Health and Public sectors across New Zealand. These projects encompassed various roles, each with distinct focuses, such as Solution Architecture, Integration, Testing, and DevOps.",
      },
      {
        company: 'Accenture Brazil',
        date: 'March 2007 - July 2016',
        url: 'https://www.accenture.com/br-pt',
        icon: PrimeIcons.CIRCLE,
        image: 'assets/images/accenture.svg',
        color: '#85929e',
        description:
          'I began my career as a Test Analyst in 2007, transitioning to Software Development and Integration a few years later. After accumulating 9 years of experience working with various clients and projects across multiple locations within the LATAM region, I received an opportunity to relocate to New Zealand. This relocation allowed me to participate in a significant business transformation project for a government agency in Wellington.',
      },
    ];
  }
}
