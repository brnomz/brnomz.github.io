import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  events: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.events = [
      {
        status: 'Mercury',
        date: 'August 2021 - Present',
        icon: PrimeIcons.CIRCLE,
        color: 'grey',
        description:
          'Responsible for technology thought leadership, providing the elaboration and detailed design of Mercury’s technology solutions and the oversight of solution implementations relating to the Digital platforms and associated ecosystem.',
      },
      {
        status: 'Vivo (Telefonica Brazil)',
        location: 'Sao Paulo (Brazil)',
        date: 'April 2020 - May 2021',
        icon: PrimeIcons.CIRCLE,
        color: 'grey',
        description:
          'Defined technology roadmap for Cloud (Azure, AWS and GCP) and DevOps projects',
      },
      {
        status: 'Accenture New Zealand',
        date: 'July 2016 - March 2020',
        icon: PrimeIcons.CIRCLE,
        color: 'grey',
        description:
          'Defined the technology strategy and roadmap to automate code development while building tasks using DevOps tools and principles',
      },
      {
        status: 'Accenture Brazil',
        date: 'March 2007 - July 2016',
        icon: PrimeIcons.CIRCLE,
        color: 'grey',
        description:
          'Improved system quality by identifying issues and common patterns, and developing standard operating procedures',
      },
    ];
  }
}
