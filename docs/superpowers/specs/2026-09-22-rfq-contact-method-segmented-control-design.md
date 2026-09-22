# RFQ Contact Method Segmented Control Design

## Goal

Replace the narrow contact-method dropdown with a neutral segmented control so all three methods remain visible without truncation.

## Approved Layout

- Remove the standalone `Contact` heading from the field.
- Place `Phone`, `WhatsApp`, and `Telegram` in the heading position as one three-part segmented control.
- Keep the existing contact-details input directly below the control and make it use the full column width.
- Keep the contact method and contact details optional.
- Preserve the current two-column RFQ form structure and responsive behavior.

## Visual Treatment

- Do not use red for this control.
- Unselected segments use a white background, light gray border, and dark text.
- The selected segment uses the site's dark navy-gray background and white text.
- The three segments share equal width and stable height.
- The group has a compact rectangular form consistent with the existing industrial UI; it does not use pill styling.
- Focus-visible styling remains clear for keyboard users.

## Form Behavior

- Implement the three methods as a native radio group named `Contact Method`.
- Values remain exactly `Phone`, `WhatsApp`, and `Telegram` so the current email format does not change.
- No option is selected by default.
- The details input remains named `Contact Details` and keeps the localized placeholder:
  - Russian: `Номер или имя пользователя`
  - English: `Number or username`
- Selecting a method does not change, hide, or validate the details input.

## Compatibility

- Keep the existing SMTP submission flow unchanged.
- Keep the existing hidden Netlify archive fields unchanged.
- Keep the legacy `Phone / WhatsApp / Telegram` fallback in the email parser unchanged.
- Keep the `Other` product-model option unchanged.

## Verification

- Static UI checks verify the radio-group name, all three method values, neutral selected styling, and removal of the old `<select>`.
- Type checking and the existing RFQ email tests must pass.
- The release build must pass.
- Visual checks cover Russian and English contact pages at desktop and 390px mobile widths, confirming no truncation, overlap, or horizontal overflow.
