import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Subject, Subscription, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  styleUrl: 'app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="user-form">
      <input type="text" [formControl]="prefix" />
      <input type="text" [formControl]="suffix" />
      <button type="button" (click)="add$.next()">Add</button>
    </div>

    <div class="user-list">
      @for (val of allValues; track val) {
        <p>
          {{ val }}
          <button
            class="icon-button"
            type="button"
            (click)="removeItemAt($index)"
          >
            &#10005;
          </button>
        </p>
      }
    </div>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  prefix = new FormControl(null);
  suffix = new FormControl(null);

  add$ = new Subject<void>();

  allValues: string[] = [];

  sub!: Subscription;

  ngOnInit(): void {
    this.sub = this.add$
      .pipe(
        map(
          () => (this.prefix.value ?? '') + ' - ' + (this.suffix.value ?? ''),
        ),
      )
      .subscribe((val) => {
        this.allValues.push(val);
      });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  removeItemAt(index: number) {
    this.allValues.splice(index, 1);
  }
}
