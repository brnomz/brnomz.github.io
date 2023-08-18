import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  skills: any[] = [];
  stars: number[] = [];

  ngOnInit(): void {
    this.skills = [
      {
        name: 'Back-End',
        description:
          'AWS Lambda, Azure Functions, Node.js, Python, Typescript, C#',
        stars: 3,
      },
      {
        name: 'Cloud',
        description: 'AWS, Azure',
        stars: 4,
      },
      {
        name: 'Databases',
        description: 'Oracle, SQL Server, MongoDB, PostgreSQL',
        stars: 5,
      },
      {
        name: 'DevOps',
        description:
          'Azure DevOps, Bitbucket, Bamboo, CircleCI, GitLab, GitHub',
        stars: 5,
      },
      {
        name: 'Front-End',
        description: 'Angular, CSS, Cypress, HTML, TypeScript, React',
        stars: 3,
      },
      {
        name: 'Project Management',
        description: 'Confluence, JIRA, LucidCharts, Miro',
        stars: 3,
      },
      {
        name: 'Tools',
        description: 'Docker, NPM, VSCode, Yarn',
        stars: 3,
      },
    ];
  }

  starsArray(length: number): number[] {
    return (this.stars = new Array(length));
  }
}
