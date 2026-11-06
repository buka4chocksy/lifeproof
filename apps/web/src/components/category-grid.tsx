'use client';

import { type ReactNode, useState } from 'react';
import { comingSoonMessage, vaultCategories } from '@/lib/categories';
import { Button } from './button';

function CategoryTitle({ level, children }: { level: 'h2' | 'h3'; children: ReactNode }) {
  const className = 'font-display text-xl leading-snug tracking-tight';
  return level === 'h2' ? (
    <h2 className={className}>{children}</h2>
  ) : (
    <h3 className={className}>{children}</h3>
  );
}

interface CategoryGridProps {
  /** Cards are `h2` on the dashboard, `h3` under the created confirmation. */
  headingLevel: 'h2' | 'h3';
}

export function CategoryGrid({ headingLevel }: CategoryGridProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {vaultCategories.map((category) => {
        const noteId = `category-note-${category.id}`;
        const expanded = openId === category.id;

        return (
          <li key={category.id}>
            <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-5">
              <CategoryTitle level={headingLevel}>{category.label}</CategoryTitle>
              <p className="mt-2 flex-1 text-sm leading-5 text-muted">{category.description}</p>
              <div className="mt-5">
                <Button
                  variant="secondary"
                  aria-expanded={expanded}
                  aria-controls={noteId}
                  onClick={() => setOpenId(expanded ? null : category.id)}
                >
                  Add<span className="sr-only"> {category.label} item</span>
                </Button>
              </div>
              <p
                id={noteId}
                role="status"
                className="mt-3 min-h-[1.25rem] text-sm leading-5 text-muted"
              >
                {expanded ? comingSoonMessage(category.label) : ''}
              </p>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
