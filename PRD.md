Interview Format
Thanks for choosing to interview with Tectonic. This document explains the Machine Coding interview round for engineering positions at Tectonic.
You must write code to solve the below problem statement.
You will have 3 hours to solve this problem and submit the solution.
You will be given a Google chat link with one of our team members to ask clarifying questions or concerns. The start and end times will be communicated on the hangout chat.
Any solutions submitted after the deadline will not be accepted.
You can code in any language of your choice and use any tools or libraries available on the internet.
Code should cover all the edge cases possible and work for them. If it is not possible to handle some cases, it should fail gracefully.
Code should be readable and modular. It should be easy to add/remove functionality without rewriting the entire codebase.
You are free to choose any images or videos from the internet to mock the data.
How to Submit the Solution
All the code, design documents or any other files should be checked into a public GitHub repository.
The folder must have a README.md file which captures an overview of how you have solved the problem, how to build your code and run it to test.
If you can host the demo solution somewhere like Netlify or Vercel, that is preferable.
Please email the link to your public GitHub repository to talent@tectonic.so with subject: [Frontend] Machine Coding Submission.

Problem Definition
Food delivery platforms are increasingly using short-form content to help customers discover dishes and restaurants. Restaurants and food creators share behind-the-scenes content, recipe walkthroughs, and beautifully plated dishes to engage hungry customers.
A Dish Story is a collection of images or videos showcasing a specific dish from a restaurant or food creator. Each image in the story has interactive ingredient hotspots (shown as pulsing dots) that highlight specific ingredients or components. Clicking on a hotspot reveals detailed information about that ingredient, including nutritional facts, allergen warnings, and customization options.
A Story Feed is an immersive, full-screen way to browse through multiple dish stories. It should have the following features:
Core Features
Media Playback with Progress Indicators
Each image is displayed with a progress bar that completes in 5 seconds before auto-advancing
Videos play until completion with visible progress. Users can pause/resume and mute/unmute videos
Progress bars for all media items in the current story should be visible at the top (similar to Instagram Stories)
Tapping on the left/right 30% of the screen navigates to previous/next media item in the story
Story Navigation
Swipe down or up to move to the next/previous restaurant's story
When transitioning between stories, smoothly reset and display the new story's progress indicators
The last viewed media position should be maintained if a user returns to a previously viewed story
Ingredient Hotspots & Info Cards
Images display pulsing circular hotspots at ingredient locations
Tapping a hotspot pauses the story timer and displays an ingredient card overlay with:
Ingredient name and image
Nutritional information (calories, macros)
Allergen warnings (if any)
"Customize" button to modify quantity or request substitutions
"Add Extra" button to add more of this ingredient for additional cost
While an ingredient card is open, the progress timer should be paused
Users can close the card by tapping outside it or swiping it down
Customization Panel
When "Customize" is clicked on an ingredient, open a bottom sheet showing:
All customizable ingredients with current quantities
Ability to increase/decrease quantities or remove ingredients
Substitution suggestions (e.g., "Replace chicken with tofu")
Running price adjustment display that updates as changes are made
"Reset to Default" button
"Update & Close" button to apply changes
Changes should persist as the user navigates through other media in the same story
Visual indicator on modified hotspots (different color or badge)
Add to Cart
Persistent "Add to Cart" button at the bottom of the screen
Shows current customizations count (e.g., "Add to Cart - 3 modifications - $14.99")
Clicking adds the dish with all customizations to cart
Success feedback with "Added to cart" message
Cart icon in the top corner with badge showing item count
1 — Main Screen: Story Feed (Full-screen)
Goal: Immersive full-screen browsing of a restaurant's Dish Story.
+-------------------------------------------------------------+
| [<]  Restaurant name            ●  · · · · · · · · · · ·  (X) |
| [Cart(2)]                                                    |
|-------------------------------------------------------------|
|                                                             |
|                 [IMAGE / VIDEO: full-screen]                 |
|                                                             |
|            (pulsing hotspot)     (pulsing hotspot)          |
|                                                             |
|                                                             |
|                                                             |
|                                                             |
|  [<30% area]            tap zones           [>30% area]    |
|                                                             |
|-------------------------------------------------------------|
| Customize - Add Extra   [Add to Cart — 1 modifications — $8]  |
+-------------------------------------------------------------+
Notes:
Top: multi-segment progress bars — one segment per media item in the current story. Active segment animates in 5s for images; videos show real-time progress.
Hotspots: pulsing circular markers with subtle shadow; accessible name/aria-label.
Bottom: persistent action bar with summary of modifications and call-to-action.

2 — Progress & Controls (Overlay)
Wireframe
+-------------------------------------------------------------+
| ▒▒▒▒▓▓▓▒▒▒▒  ▒▒▒▒  ▒▒▒   ▒  (progress strips)  [Mute] [Pause]|
|-------------------------------------------------------------|
|         Full-screen media                                      |
|                                                               |
+---------------------------------------------------------------+
Behavior
Tap left/right 30% to prev/next media. Tap center to pause/resume.
Video player shows play/pause, current time / total time; mute/unmute toggle in top-right of media area.

3 — Hotspot Interaction & Ingredient Card
Wireframe (overlay card)
+-------------------------------------------------------------+
| (media continues dimmed)                                    |
|                                                             |
|          - hotspot tapped — story timer paused               |
|                                                             |
|         +---------------- Ingredient Card ----------------+  |
|         | [X] Ingredient name                [image]       |  |
|         | Calories 180  |  Protein 12g | Carbs 6g         |  |
|         | Allergen: Milk, Soy                       ⚠️      |  |
|         | [Customize]  [Add Extra +$1.50]                    |  |
|         +------------------------------------------------+  |
|                                                             |
+-------------------------------------------------------------+
Interaction details
Opening the card pauses the progress timer; closing resumes where it left off.
Tapping outside or swiping the card down closes it.

4 — Customization Bottom Sheet (Hi-Fi)
Wireframe
+-------------------------------------------------------------+
|                         Bottom sheet                        |
|  -----------------------------------------------            |
|  Dish: Butter Chicken — Base price $9.99                    |
|  Ingredient list:                                            |
|   - Chicken   Qty 1  [-]  [ + ]   (remove)   [Replace ->]    |
|   - Butter    Qty 1  [-]  [ + ]   (remove)                  |
|   - Chili     Qty 1  [-]  [ + ]                           |
|                                                             |
|  Substitution suggestions (inline)                           |
|  Running adjustments: +$2.50                                |
|  [Reset to Default]                   [Update & Close]       |
+-------------------------------------------------------------+
Behavior
Quantity controls update running price immediately.
Substitution opens a small inline chooser (e.g., "chicken → tofu") and updates the visual badge on the hotspot to a modified state.
State persists across media in the same story.

5 — Story Navigation (Vertical)
Wireframe
Swipe down -> next restaurant story
Swipe up   -> previous restaurant story
Notes
When moving between stories, progress indicators reset to the new story's media count.
Maintain last viewed position: store {storyId: lastMediaIndex, timestamp} in local session storage (or backend if logged in).

6 — Add to Cart & Cart UX
Wireframe
[Bottom CTA] Add to Cart — 3 modifications — $14.99
On success: small toast top-center "Added to cart" with undo.
Cart icon top-right with badge count.
Notes
CTA disabled if no dish loaded or network down.
Show undo (5s) after adding.

