import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GeminiService } from './service/gemini.service';
import { VERB_PROMPT } from './prompt/verb.prompt';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public inputValue: string = '';
  public response: any;

  private _geminiService = inject(GeminiService);

  constructor() { }

  async processInput() {
    const result = await this._geminiService.generateText(VERB_PROMPT, this.inputValue);
    this.response = JSON.parse(result);
  }
}
