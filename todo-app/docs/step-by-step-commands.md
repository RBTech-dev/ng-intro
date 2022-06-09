# Step by step commands

```shell
npm install -g @angular/cli
ng new todo-app --routing --prefix app

# Install eslint
ng add @angular-eslint/schematics

# Install Prettier
npm install prettier prettier-eslint eslint-config-prettier eslint-plugin-prettier --save-dev

# Localize
ng add @angular/localize
```

* Update the `app.module.ts` providers' the `LOCALE_ID`:

```ts
  providers: [{ provide: LOCALE_ID, useValue: 'it-IT' }]
```

```shell
# Install Material
ng add @angular/material

# Create shared module
ng g module shared

# Generate todo-list container
ng g component todo/containers/todo-list --skip-tests --export --inline-style --inline-template

# Generate todo-details container
ng g component todo/containers/todo-details --skip-tests --export --inline-style --inline-template

# Generate TodoExists guard used by todo-details container
ng generate guard todo/guards/TodoExists --skip-tests

# Generate todo component used by todo-list and todo-detail containers
ng g component todo/components/todo --skip-tests --export

# Generate todo component used by todo-list and todo-detail containers
ng g component todo/components/todo --skip-tests --export

# Generate interceptor to handle server-side error showing a message to the user
ng g interceptor shared/interceptors/show-snackbar-on-error.interceptor --skip-tests
```

* Inside `shared` module, create a new `domain` directory `todo` with models and services (do not forget `index.ts` barrel files):

```ts
// todo/models/todo-item.model.ts
export interface TodoItemModel {
  id?: number;
  title: string;
  doneAt?: string;
}

// todo/services/todo.service.ts
import { Injectable } from '@angular/core';
import { TodoItemModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
// TODO
}

// shared/shared.module.ts
@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule],
  exports: [CommonModule, FormsModule],
  providers: [TodoService],
})
export class SharedModule {}
```

* Create the `todo-list` component that will render the list of all todos. It will be a simple component

```shell
ng g c todo-list --inline-template --inline-style --skip-tests
```

## PWA

```shell
ng add @angular/pwa --project todo-app
npm install --global http-server
ng build
ng serve
http-server -p 8080 -c-1 dist/todo-app --proxy http://localhost:4200 --proxy-options.secure false
```
