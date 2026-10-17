/**
 * Shared form styles — single source of truth for every lead form on the site.
 * Mirrors the look of the Contact page form (ContactPageClient.tsx) so all
 * forms (booking, guides, resources, community, let's talk, tool finder) look identical.
 */

/** Text / email / tel inputs */
export const formInput =
  "w-full bg-white/80 border border-gray-200/70 rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-teal/60 focus:bg-white focus:outline-none transition-all disabled:opacity-50";

/** Native selects (wrap in a `relative` div and add <FormSelectChevron />-style icon) */
export const formSelect =
  "w-full appearance-none bg-white/80 border border-gray-200/70 rounded-2xl px-4 py-3 pr-10 text-sm text-gray-800 focus:border-brand-teal/60 focus:bg-white focus:outline-none transition-all cursor-pointer";

/** Textareas */
export const formTextarea = `${formInput} resize-y`;

/** Visible label (used only above textareas / option groups, like the Contact form) */
export const formLabel = "block text-xs font-bold text-gray-700 mb-1.5";

/** Form wrapper spacing */
export const formStack = "flex flex-col gap-3";

/** Two-column row inside a form */
export const formRow = "grid grid-cols-1 sm:grid-cols-2 gap-3";

/** Consent checkbox + its label */
export const formCheckbox = "mt-0.5 w-4 h-4 rounded border-gray-300 accent-brand-dark cursor-pointer shrink-0";
export const formCheckboxLabel = "text-xs text-gray-600 leading-relaxed cursor-pointer select-none";

/** Small privacy / helper text */
export const formHelpText = "text-xs text-gray-500";

/** Primary submit button */
export const formSubmit =
  "w-full inline-flex items-center justify-center gap-2 bg-gray-950 text-white text-sm font-bold py-3.5 rounded-2xl hover:bg-brand-dark transition-all mt-1 cursor-pointer active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed";

/** Error message */
export const formError = "text-xs text-red-600 text-center";
