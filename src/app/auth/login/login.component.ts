import { afterNextRender, Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  @ViewChild('form') form!: NgForm;
  private destroyRef = inject(DestroyRef)
  router = inject(Router)

  constructor() {
    afterNextRender(() => {
      const subscriber = this.form.valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (value) => { console.log(value) }
      });
      this.destroyRef.onDestroy(() => { subscriber?.unsubscribe() })
    })
  }

  onSubmit(formData: NgForm) {
    const enteredEmail = formData.form.value.email
    const enteredPassword = formData.form.value.password;

    if (formData.form.valid) {
      formData.form.reset()
    }
  }

}
