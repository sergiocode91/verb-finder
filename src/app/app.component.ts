import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GeminiService } from './service/gemini.service';
import { VERB_PROMPT } from './prompt/verb.prompt';

interface Verb {
  infinitive: string;
  simple_past: string;
  past_participle: string;
  spanish_translation: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public inputValue: string = '';
  public response = signal<Verb | null>(null);
  public isLoading = signal<boolean>(false);


  private _geminiService = inject(GeminiService);

  constructor() { }

  async processInput() {
    this.isLoading.set(true);
    const result = await this._geminiService.generateText(VERB_PROMPT, this.inputValue);

    this.response.set(JSON.parse(result));
    this.isLoading.set(false);
  }
}
