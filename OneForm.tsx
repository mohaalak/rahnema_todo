import * as React from 'react';
export function OneForm({ submit }: any) {
  return (
    <form
      onSubmit={(e: any) => {
        e.preventDefault();
        const todo = e.target.children[0].value;
        submit(todo);
      }}
    >
      <input />
      <button>Submit</button>
    </form>
  );
}
