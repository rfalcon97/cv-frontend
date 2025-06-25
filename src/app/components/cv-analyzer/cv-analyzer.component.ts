import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cv-analyzer',
  templateUrl: './cv-analyzer.component.html',
  styleUrls: ['./cv-analyzer.component.css']
})
export class CvAnalyzerComponent implements OnInit {

  ngOnInit(): void {
    this.setupDropZone();
    this.setupTagInput();
    this.setupCandidateCards();
  }

  setupDropZone(): void {
    const dropZone = document.querySelector('.drop-zone');
    if (!dropZone) return;

    const preventDefaults = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, preventDefaults, false);
    });

    dropZone.addEventListener('drop', (e: Event) => {
      const event = e as DragEvent;
      const dt = event.dataTransfer;
      const files = dt?.files;
      if (files && files.length > 0) {
        alert(`${files.length} archivo(s) cargado(s) correctamente.`);
      }
    });
  }

  setupTagInput(): void {
    const tagInput = document.querySelector('.tag-input') as HTMLInputElement | null;
    const tagContainer = tagInput?.parentElement;
    if (!tagInput || !tagContainer) return;

    tagInput.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' && tagInput.value.trim() !== '') {
        e.preventDefault();
        this.addTag(tagInput.value.trim(), tagInput, tagContainer);
        tagInput.value = '';
      }
    });

    document.querySelectorAll('.mt-2 button').forEach(button => {
      button.addEventListener('click', () => {
        this.addTag(button.textContent?.trim() || '', tagInput, tagContainer);
      });
    });

    document.querySelectorAll('.tag button').forEach(button => {
      button.addEventListener('click', () => {
        button.parentElement?.remove();
      });
    });
  }

  private addTag(text: string, tagInput: HTMLInputElement, tagContainer: HTMLElement): void {
    if (!text || !tagInput || !tagContainer) return;

    const tag = document.createElement('div');
    const colorClasses = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-yellow-100 text-yellow-800',
      'bg-red-100 text-red-800',
      'bg-indigo-100 text-indigo-800',
    ];
    const randomColor = colorClasses[Math.floor(Math.random() * colorClasses.length)];

    tag.className = `tag ${randomColor} px-3 py-1 rounded-full text-sm flex items-center mr-2 mb-2`;
    tag.innerHTML = `
      ${text}
      <button class="ml-2 focus:outline-none">
        <i class="ri-close-line"></i>
      </button>
    `;

    tagContainer.insertBefore(tag, tagInput);

    tag.querySelector('button')?.addEventListener('click', () => {
      tag.remove();
    });
  }

  setupCandidateCards(): void {
    const detailButtons = document.querySelectorAll(
      '.candidate-card button.text-primary'
    );
    const expandedDetails = document.querySelector(
      '.border.border-gray-200.rounded-lg.p-6.mb-8'
    ) as HTMLElement | null;
    const closeDetailsButton = expandedDetails?.querySelector(
      'button.text-gray-500'
    );

    detailButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (expandedDetails) {
          expandedDetails.style.display = 'block';
          expandedDetails.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    closeDetailsButton?.addEventListener('click', () => {
      if (expandedDetails) {
        expandedDetails.style.display = 'none';
      }
    });

    if (expandedDetails) {
      expandedDetails.style.display = 'none';
    }
  }

}
