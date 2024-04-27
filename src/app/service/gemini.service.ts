import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private generativeAI: GoogleGenerativeAI;

  constructor() {
    this.generativeAI = new GoogleGenerativeAI(
      'AIzaSyAeA9bqnaOT_euzL71NLcldpqdWJrEMkaw'
    );
  }

  async generateText(prompt: string, userInput: string) {
    const fullPrompt = prompt.replace('"TEXTO A ANALIZAR"', userInput);

    try {
      const model = await this.generativeAI.getGenerativeModel({
        model: 'gemini-pro',
      });
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      const text = await response.text();
      return text;
    } catch (error) {
      console.error('Error while generating text:', error);
      return 'Error processing your request';
    }
  }
}
