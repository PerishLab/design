# Ledger

The defect ledger for the long optimisation. Entries are recorded, not fixed.
Each one is a place where the token vocabulary or the component contract could
not express what a real screen needed.

The instrument is `apps/docs/src/proof/Proof.svelte`, served at `/proof`. It
composes every renderable component into one plausible product surface, because
a design language lives in the relationships between components and cannot be
judged from isolated chips.

`apps/docs` is granted no `style` syntax by `ectropy.toml`; the proof screen may
therefore use nothing but the library. Every layout it cannot reach is a real
gap rather than a matter of taste.

## Baseline

Recorded against the current token set, before any probe theme. Light and dark
both render; nothing here is a regression.

### Contract

| # | Entry |
|---|---|
| L1 | `Code` declares `children: string`, so the children syntax does not type check. The consumer must write `children={law}` as an attribute. Every other component takes a `Snippet`. Caught by `svelte-check`, not by reading. |
| L6 | `Badge` and `Tag` render as near-identical pills but disagree on contract: `children: Snippet` against `text: string`. Two generators for one shape. |
| L9 | Closed by absorption, once trimming made the case unambiguous. With `Frame` reduced to a measure, a centring, and an edge, `Page` was that plus a gap and a title, and `Head` already carries titles. `Views` renders a `Frame` with a `Head` where it used to render a `Page`. Forty one generators where there were forty two, and the one that left had been demonstrating its own redundancy on the proof screen for eleven commits. |
| L11 | `List` requires the consumer to author `<li>`, and reaches them through a `.list li` descendant selector. It renders as a wrapping row of chips, which reads as tags rather than as a list. |

### Expression

| # | Entry |
|---|---|
| L4 | Closed. `Sheet` centres itself. A bounded surface is the one thing that knows how wide it wants to be, so where the slack goes is its answer rather than a host's. |
| L3 | Closed. `Search` dropped its baked margin and gained `min-width: 0`, so it shrinks instead of demanding the row, and `Button` refuses to wrap its label, which is true of a button whatever sits beside it. The button next to the filter is one line tall again. |
| L2 | Closed with P4. The ghost takes its size from `--hero` rather than from a grid column, so it scales with the display voice instead of with a layout measure, and it no longer covers the row beneath.
| L10 | `Board` right-aligns its action only through `.board-body > .button`. It works, but `Board` must know that `Button` exists. |

### Substrate

| # | Entry |
|---|---|
| L5 | Closed twice over. `--lift` gives a surface elevation to stand on, and the base tones widened their separation besides: light moved to `#f3f5f8` against `#e0e5eb`, dark to `#0c0e12` against `#191f28`. The contrast assertions still clear on both. |
| L12 | `.button-solid` pairs `background: var(--accent)` with `color: var(--ground)`. This reads in both tones only because accent and ground happen to sit at opposite ends. There is no foreground-pairing atom, so a theme with a light accent on a light ground fails on contact. Currently passing by luck. |
| L7 | Closed. `Copy` reads `--ink`, so it looks like something that can be pressed, and it carries the state layer besides. |
| L8 | `Footer` hardcodes `a PerishLab workshop — this site is MIT and guarded by its own constitution.` It appears verbatim on a screen that has nothing to do with that site, and every consumer of the published package receives it. |

## Standing

Recorded so the probes do not spend effort re-finding them.

| # | Entry |
|---|---|
| S1 | `packages/design/src` and `packages/design/src/layout` are both at `fanout` 10 of 10. The law is reporting that the generator set is saturated, not that the shelf is short. |
| S2 | `Shell` and `Frame` both write global `body`, `::selection`, and `:focus-visible` rules, and both `@use` the token and theme modules. Using them together injects the base twice. |
| S3 | In `Realm`, tone is set on the iframe's own `documentElement`, so `[data-tone="dark"]` and `@media (prefers-color-scheme: light) :root` land on one element at equal specificity and source order decides. `light` is used after `dark`, so a light-preference machine should be unable to switch a preview to dark. Reasoned from source; not yet confirmed in a browser. |
| S4 | Standing, and bound by the platform rather than the design. Neither a media query nor a container query accepts a custom property in its size condition, so a breakpoint cannot be a token however it is stored. Recorded so nobody spends an afternoon rediscovering it. |
| S5 | `package.json` exports only `.` and `./vite`. The token and theme layer has no public entry, so no consumer can reach it. |
| S6 | Component CSS enters through `import "./X.scss"`, so cascade order follows the bundler's module order. There are no `@layer` bands to make it deterministic. |
| S7 | `.knobs` and `.knob` in `apps/docs/src/knobs/Knobs.svelte` are styled nowhere. The knob panel has never had any CSS. |

## Standing well

Not everything needs repair, and a probe that flattens these would be a
regression.

- `Ledger` earns its place: dotted leader, tabular tally, column flow.
- `Rail` reads in both tones, with the accent carried only by the first stop.
- `Nav` marks the active entry with an offset underline in the accent.
- `Code` carries its file name and copy control in a header band without noise.
- Spectral at 600 carries the heading hierarchy on its own, which is what lets
  the near-flat surface palette survive at all.

## Probes

Three systems chosen for distance, not popularity, and each pushed as far as the
current token set allows: `?system=swiss`, `?system=material`, `?system=terminal`
on the proof screen. Every one of them arrives. What follows is what none of
them could say.

### Roles welded together

One token serving two unrelated roles cannot be set for one without breaking the
other. Four of these, all found by rendering rather than by reading.

| # | Entry |
|---|---|
| P1 | Closed by renaming the roles. `--crown` is the display voice, `--plain` is the reading voice, `--exact` is the technical one. Swiss loads a grotesque into `--crown` and nothing about that reads as a contradiction, which is the whole difference between naming a classification and naming a role. |
| P2 | Standing, narrowed. `--exact` still carries both code and small technical labelling. The rename makes the shared role legible where `--mono` hid it, but a language that wants grotesque labels beside a real monospace still cannot say so. One atom, two jobs, waiting for a language that makes the split earn itself. |
| P3 | `--mist` is the opacity of `.hero .ghost` and of `.button:disabled`. No theme can suppress the decorative glyph without erasing every disabled button. |
| P4 | `--cell` is both the grid column minimum and the ghost glyph's font size. Terminal set `--cell: 32ch` for a correct column and got a 32ch glyph covering the whole search row. |

### Registers that do not exist

| # | Entry |
|---|---|
| P5 | One `--radius` scalar. Material needs pill buttons beside 12px cards beside 4px fields. Rounding the button rounds `Code`, `Board`, `Sheet`, and every input with it. There is no shape scale keyed by role. |
| P7 | No elevation, anywhere. Material's defining register is elevation, and `Board` renders as a flat rectangle with a hairline. Material without elevation is not Material. |
| P8 | Nothing switches a decorative element off. `Hero` draws its ghost unconditionally once `mark` is passed. |
| P9 | Closed. `--heft` is the display weight and `--firm` is the control weight. Terminal now states a flat `400` for headings and a `700` for its controls, so the hierarchy it wanted to lose and the affordance it wanted to keep are two statements instead of one. Brutal carries `900` on its controls for the same reason. |
| P10 | Closed by the theme rather than the library. Swiss states a hairline red wash for `--flush` instead of white, which is what its own print tradition does with a warning, and the contrast assertion held it to the bar while doing so. The atom was never wrong; the theme was saying nothing with it. |
| P14 | Two interaction registers exist and only one has atoms. A filled control tints toward its foreground, which `--hover` and `--press` now say. An unfilled one shifts colour instead, and `Link`, `Forge`, `Nav`, and `Card` all shift toward `--bright` because that is written into each of them. The target is a token, so a theme can move it, but the choice of which token is not a theme's to make. |
| P15 | `Card` styles whatever a consumer puts inside it through `p` and `a` descendant selectors, the same shape of leak as `.list li`. It cannot be removed yet: there is no prose generator, so the proof screen has no other way to write a paragraph. The leak is load bearing until the native tag inventory is answered. |
| P16 | Closed, and the hybrid turned out to be the right shape. `Frame`, `Page`, `Board`, `Sheet`, `Card`, and a nested `Shell` declare themselves containers, and `Grid`, `Hero`, `Nav`, and `Rail` query the container rather than the window. The token level keeps its viewport query, because display type shrinking on a small screen is about the screen. Demonstrated at a viewport of 1400 pixels: narrowing the frame to thirty rem turns the rail from a row into a column, which a media query could not have said. |
| P14 | Resolved as far as a pure token theme reaches. An unfilled control shifts toward `--bright`, and a theme owns what bright is, so the register is themeable. What a theme still cannot say is *invert on touch* rather than *shift on touch*, and that is a template decision rather than a token one. Left as the boundary of the approach rather than as a gap in it. |
| P16 | Superseded, kept for the reasoning: breakpoints stayed in viewport media queries while the gallery did not exist. Container queries would make a component answer to its own box, which is what a gallery comparing ten systems at many widths will want, but the token-level narrow override shrinks `--hero` and `--space-6`, and display type answering to the viewport is correct. The right shape is a hybrid, and the gallery has to exist before the seam between the two is visible. |
| P13 | Closed by composition rather than by a new part. `Split` states two sides and the proof screen uses it exactly that way, a menu on one and the cut on the other. `Card` pushes its last child down by position. An `align` prop on every container, or a spacer generator, would be the kind of addition the law exists to refuse: it is not a new dimension, it is a case the existing ones already cover. |
| P11 | Closed. `Grid` takes `cols` for a fixed column count and `Cell` takes `span` and `start`, so a consumer can place a thing on a modular grid without writing CSS or markup of its own. The proof screen lays its planes on twelve columns at seven and five and five and seven, which is the asymmetric rhythm Swiss is built on and the thing an auto-filling track could never say. |

### Demonstrated, no longer predicted

| # | Entry |
|---|---|
| P6 | `.button-solid` pairs `background: var(--accent)` with `color: var(--ground)`. Feeding Material its own dark-theme primary `#d0bcff` against its light ground `#fef7ff` puts the label at **1.63:1**, far under 4.5. All three probes pass only because each happens to use an accent maximally distant from its ground. The missing atom is a foreground paired to a background, and it is missing in every component that fills a surface. |
| P12 | System and preference do not compose. `data-tone` re-declares the entire colour palette, so a system set on an ancestor is erased for every colour while lengths and fonts pass through untouched. Swiss first arrived in Helvetica with square corners and the base palette. It only resolves here because `Shell` was given a `system` prop so both land on one element, and because each theme is written at `[data-system][data-tone]` specificity to out-rank the tone layer. Out-ranking by hand is not a design. |

## Native tags, answered

The proof screen now writes no tag of its own. A grep for every native element
across it returns nothing.

| Was | Now |
|---|---|
| `<p>` | `Text` carries prose, measured to `--prose`. |
| `<h2>` `<section>` | `Head` carries a section heading and its own top rule and anchor, which is what `<section>` was there to give it. Both tags left together. |
| `<li>` | `Item` carries a list entry, and `List` no longer reaches into a consumer's markup through `.list li`. |
| `<a>` | `Nav` takes `links` with a label, a target, and a live state. The active entry was previously unreachable without hand-written markup and a hand-written class. |

`Check` and `Pick` join them, so a form is expressible without an input of one's
own. Thirty two exports where there were twenty eight.

| # | Entry |
|---|---|
| — | The Stage registry was never needed. It was recorded as a blocker on the assumption that `markup = 8` counted branches; it counts depth. Twenty extra branches were pushed into the chain and the scan stayed clean, so the refactor that was going to unblock expansion was work that expansion never needed. |
| P21 | Closed. `Check look="switch"` is a track and a thumb now, drawn from the same atoms as everything else: the track takes `--bead`, the thumb takes `--onaccent` when thrown, and the travel is a multiple of `--body`. Under Brutal it comes out square with a three pixel rule and a coral fill, under Cupertino rounded and blue, without either theme saying a word about switches. |
| P15 | Closed. `Card` reaches nothing now. It states its own type register on itself, `--fine` and `--muted`, and whatever it holds inherits, which is what a register is for. Its heading carries a class instead of being found by tag, and the last child is pushed down by `> :last-child` rather than by knowing a link will be there. `Text` stopped declaring a colour so that inheriting works. |

## Native tags

The app layer may use no native HTML tags, so that a structure the library
cannot express is as visible as a layout it cannot reach. The law is spoken, not
yet machine enforced.

The proof screen still violates it, and every violation names a missing
generator.

| Tag | Missing |
|---|---|
| `<section>` `<h2>` | No sectioning or heading generator. `Board` carries a title but drags a panel along with it, and `Page` carries one but claims the document. |
| `<p>` | No prose generator. Every paragraph on the screen is native. |
| `<a>` | `Nav` requires the consumer to author its anchors, which is also why `.nav a.active` can only be reached by hand-written markup. |
| `<li>` | `List` requires the consumer to author its items, and styles them through a `.list li` descendant selector. |

## Closed

| # | How |
|---|---|
| P12 | `@layer tokens, tone, system, base, component, override` gives the cascade a designed order. A system now outranks a tone because it sits in a later band, not because someone stacked a second attribute onto the selector. Both sides are plain single-attribute rules again, and Swiss keeps its white ground and red accent with `data-tone="light"` still on the element. |
| S6 | The same declaration bands component and override rules ahead of the token and theme layers, so cascade no longer follows the bundler's module order. Component rules are not yet moved into their band; that happens when they are rewritten. |
| P6 | `--onaccent` is now an atom, and `.button-solid` and `::selection` read it instead of borrowing `--ground`. Every theme states its own answer: white on Swiss red and Material purple, near-black on Terminal green. The pairing is declared rather than lucky. |
| P7 | `--lift` is an atom of universal syntax, so a theme states a whole shadow rather than a level on a scale. Material carries a real two-layer elevation, `0 1px 2px rgb(0 0 0 / .3), 0 2px 6px 2px rgb(0 0 0 / .15)`. Swiss and Terminal carry `none`, which is the point: a scalar would have forced them to say *level zero* when what they mean is that the register does not exist in that language. |

`--knob` splits control shape from surface shape, so Material gets pill buttons
beside `0.75rem` cards. P5 is only half closed: two shape atoms are not a scale
keyed by role, and `Code`, `Sheet`, and the inputs still share `--radius`.

Adding these three moved the tone and system boundary. It is not colour against
everything else, it is what varies with preference against what varies with the
design language, and a shadow varies with preference. `palette` therefore takes
`$toned`, which is the hues plus the veils.

## Ten systems

Swiss, Material, Terminal, Cupertino, Carbon, Ant, Brutal, Relief, Glass, and
Folio. The tone themes and the system themes now live in separate rooms, because
they answer different contracts: a tone supplies a palette, a system supplies the
whole vocabulary.

Every one of the seven new systems compiled on the first build. The contract had
already made that safe: forty four atoms, and the build names any that a theme
forgets.

| # | Entry |
|---|---|
| P17 | Ant Design's own primary, `#1677ff`, carries white text at **4.10**, under the four and a half the rest of the library clears. This is not a mistake in the theme, it is what Ant ships. The theme uses Ant's own darker blue instead and the failure is recorded here, because a probe that quietly rounds a mainstream system up to passing is not a probe. |
| P18 | Contrast cannot be measured through a sheer surface. Glass states `--panel` and `--flush` as translucent white and red, so what a foreground actually sits on depends on whatever is behind the element. The test now refuses to guess: it separates what it measured from what it could not, and asserts that the unmeasurable set is exactly `glass.bright` and `glass.warn`. A new theme that quietly turns a surface translucent fails the run for growing that set. |
| P19 | Brutal proves the shadow decision. `5px 5px 0 #000000` renders as a hard offset with no blur at all, which is the whole signature of the language. An elevation scale would have made Brutal ask for a level and Swiss ask for level zero, and neither would have been what either meant. |
| — | `--frost` is an atom, and `Board` and `Sheet` read it as `backdrop-filter`. Glass states `blur(16px) saturate(1.4)` and every other system states `none`. |
| P20 | Registering `--ground` as `<color>` is what forbids a gradient, and it is also what makes a broken theme scream magenta. That read as a trade to be paid, and it was not one. A backdrop and a surface colour are two dimensions that had been folded into one token. `--wash` is universal, defaults to `none`, and paints over `--ground` rather than replacing it, so Glass finally has something for its blur to work on and the type, the sentinel, and the contrast measurement all survive untouched. The question that looked like a fork was a mismodelling. |

## Look

Contrast is asserted, the atom set is a contract, and neither notices a
component's CSS moving. Eleven languages across forty one generators for three
months is long enough that a quiet regression is not a risk, it is a certainty.

`pnpm --filter design-docs look` drives `playwright-cli` over the built site and
writes the resolved colour, shape, face, weight, shadow, and box of every part
of the proof screen in every system. Eleven systems, twenty seven parts, and
nothing absent.

Pixels were the wrong baseline. Antialiasing makes a diff noisy, a PNG makes it
unreadable, and neither tells you what moved. Text tells you: setting Material's
knob to four pixels shows up as three parts changing from `100px` to `4px`, and
the diff points at them by name. It is the same instrument plumb already uses on
its vocabulary, applied to appearance.

It stays out of the guard chain deliberately. It wants a build, a port, and a
browser, and a lane that has to be cheap should not want any of those.

## The iframe dies

`Realm` cloned every stylesheet into an iframe and mounted a component inside
it, because two themes could not stand on one page. They can now, so it is four
lines: a `Shell` carrying a system and a tone, wrapped around the stage.

The thing that made it possible is a rule `Shell` states about itself. A `Shell`
inside a `Shell` drops its viewport height and its fixed backdrop, because
nesting demotes it: the outer one owns the document and the inner one owns a
region. Specificity carries it without a flag, and the gallery renders forty one
shells on one page with each preview dressed in whichever of the ten systems the
reader picked, while the page around them keeps its own.

| # | Entry |
|---|---|
| S7 | The knob panel had no CSS anywhere, because the app layer may not write any. It is built from `Line`, `Field`, `Check`, and `Tag` now, which is what the law was asking for the whole time. Six more native tags left the app layer with it. |
| P22 | Closed by the same rule that demoted the nested shell. A region that cannot hold what tries to leave it is not a region, so a nested `Shell` takes `contain: layout` and becomes the containing block for its fixed descendants. `Toast` now renders inside its own bench. One line, and it follows from what nesting already meant rather than being bolted on. |

## The axis forcing work

The taxonomy started paying the moment it was applied. Seven generators were
waiting to be added, three of them marks, and `mark` had one place left. The law
asked its question immediately and got two real answers.

`Spin` is not a generator. It is `Meter` with no value: a determinate quantity
and an indeterminate wait are one thing in two states, which is the same shape
of mistake `Badge` was.

`Ledger` was misfiled. It receives a collection and lays its members out, which
is what `Rail` and `Nav` do, so it belongs with them. That sharpened the rule
into something decidable: **receives a collection and places its members** is
`arrange`, and renders its own content is `mark`.

Forty generators, six rooms, and two of them at ten of ten. The next one to be
added will be asked the same question rather than handed a drawer.

| Room | Count |
|---|---|
| mark | 10 |
| focus | 10 |
| arrange | 7 |
| enclose | 5 |
| layer | 4 |
| document | 4 |

## The axis that failed

Modal and Toast were built to settle whether owning a layer and owning the
document are one axis or two. They settle it, and they also break the axis that
asked.

Toast owns a layer and owns nothing else: no focus, no claim on the document
behind it. Modal owns a layer, owns focus while it is open, and owns the
document through the platform's inert backdrop. Sharing one axis and differing
on two is what makes them two.

But counting the whole library by what each generator owns gives this:

| Owns | Count |
|---|---|
| nothing | 19 |
| focus | 8 |
| the document | 4 |
| a layer | 2 |

Nineteen of thirty three own nothing. `fanout` is ten. The axis argued for as the
replacement for `content / control / layout / surface` produces a residual bucket
twice the size of the law, which is the same disease the four buckets had,
wearing a better argument.

Ownership is a good predicate. Every membership above is decidable without
taste, and `control` survived the original audit precisely because it was the
one bucket ownership already described. It is a bad projection: predicates do
not have to partition evenly, and directories do.

The other candidate axes fail the same way. Arity puts fifteen generators under
wrapper. Territory puts most of the library at block scale. No single honest
axis cuts thirty three generators into buckets of ten.

## The axis that held

The reading above was wrong in its conclusion, and the correction is the whole
answer. Orthogonal axes are not equal. One of them bears the load, and reaching
for tags to avoid naming it was a way of dodging a choice rather than making it.

Ownership bears the load, and the reason is not statistical. Every behaviour in
the library hangs off it: taking focus means keyboard, roles, disabled state, a
focus ring; taking a layer means the top layer, escape, a focus trap, a scroll
lock; taking the document means the reset and the scope. Arity, by contrast,
decides only the shape of a props signature. The domain is the interaction
closure and ownership is the interaction axis, so of course it holds.

Its nineteen were never evidence against it. `nothing` is not a value, it is a
complement, defined by what is left over. That is precisely the disease `layout`
had. A load-bearing axis cannot carry a negative value, because a negative value
is a residual bucket by construction.

Said positively, one axis takes the whole library:

| Takes responsibility for | Count |
|---|---|
| mark | 9 |
| focus | 8 |
| arrange | 5 |
| enclose | 5 |
| document | 4 |
| layer | 2 |

Thirty three generators, no duplicate, no residual, and the largest room at nine
of ten. Tight rather than slack: one more generator that marks forces a real
question instead of a quiet new drawer.

It also explains the original four. `control` survived the first audit because
it happened to equal exactly one value of this axis. `layout` was `arrange` and
`enclose` and `mark` and `document` stirred together, `surface` was `enclose`
and `document` and `layer`, and `content` was `mark` with `List` misfiled. The
old scheme was always this axis with its values blurred.

The other axes were never candidates for the tree. Arity, flow, and territory
are projections, and the gallery is where they belong.

## A test that lied

The split was nearly abandoned on evidence that turned out to be worthless, and
the shape of the mistake is worth keeping.

A cross-package `@use` was tried from `Shell.scss` and failed. The `pkg:` scheme
with a node package importer was tried and failed the same way. Two failures
read as a structural blocker, and the conclusion drawn was that a split would
tax every consumer with sass configuration.

Both tests were self-references. `packages/design/src` cannot see
`@perish/design` in any ancestor `node_modules`, because the package does not
depend on itself. Sass on its own resolved every form correctly the moment it
was asked from a directory that could see the package at all.

The real split has `packages/design` depend on `@perish/token`, pnpm links it
into `packages/design/node_modules`, and resolution works. A degenerate case was
mistaken for the general one.

The consumer tax is zero as well, because the design plugin already had to be
installed and can carry the importer itself. The build-time half of the library
is exactly the thing that should own how the library resolves.

## Contract

`tokens.scss` now holds the atoms as Sass lists grouped by kind, generates all
forty `@property` registrations from them, and exposes two mixins.

`palette` takes the ten hues and is what a tone supplies. `dress` takes every
atom and is what a system supplies. That split is the same one the themes
already wanted: a preference varies the palette, a system varies the whole
vocabulary.

Both refuse a theme that omits an atom and refuse a theme that invents one.
Deleting `dent` from Swiss fails the build with
`the swiss system does not define the atom dent`, naming the theme and the atom.

Adding an atom is now safe in the same way. It goes in one list, and the build
stops on every theme that has not answered for it.

| # | Entry |
|---|---|
| L6 | `Badge` is gone, absorbed. It was an outlined pill and `Tag` was a filled one, at the same padding, the same radius, and the same size, so the difference between them was never a component, it was `look`, the axis `Button` already had. The library states twenty five generators where it stated twenty six, and the one it lost was a composition wearing a name. |
| L1 | `Code` takes `text`, so the whole library agrees that `children` is a snippet and `text` is a string it must read. |
| — | One `tone` meant three things. It now means one. `Button` takes `look` for solid against quiet, `Note` and `Tag` take `mood` for calm against warn, and `Shell` keeps `tone` for the light and dark preference, beside `system`. That last pair is the model stated in the props: a preference and a design language, and they no longer share a word with visual emphasis. |
| — | One role had three names. `Hero`, `Board`, and `Banner` all take `line` for the supporting line under a title. `text` is left to mean what a component reads and shows, which is what `Note`, `Tag`, `Copy`, `Code`, and `Footer` already meant by it. |
| — | `Field` and `Search` make `value` bindable, so `bind:value` works and `change` becomes the optional side channel it always should have been. `Button` splits `halt` from `busy`, because refusing a press and claiming to be working are different statements. |
| P5 | `--slot` completes the shape scale. Material now states pill buttons at `100px`, cards at `0.75rem`, and fields at `0.25rem`, which is three shapes in one language and was the thing a single radius could never say. |
| — | `Banner` sizes its mark from `--hero` instead of a bare `3.5rem`, so the glyph box scales with the display voice that fills it. |
| — | Contrast is asserted rather than hoped for. `packages/design/tests/theme.test.ts` compiles the shipped substrate, reads every theme's block back out of the CSS, and checks five pairings in each. All five themes clear 4.5. Feeding Material a pale accent fails the run with `material.onaccent 1.70`, naming the theme, the role, and the ratio, so the test is known to bite. |
| S3 | The tone band splits into `tone.given` and `tone.chosen`, so what the system offers sits under what a person picked. Verified under an emulated light preference: `:root` reads light, and setting `data-tone="dark"` on that same element now turns it dark. It could not before, because both rules sat at equal specificity in one band and source order decided. |
| — | `--hover` and `--press` are atoms, and `Button` and `Copy` carry a state layer that tints toward their own foreground. The solid button no longer collapses into a ghost when a pointer touches it: it keeps its fill and its foreground and takes an eight percent lift instead. Each system states its own feel, and Swiss and Terminal pair a hard step with `--beat: 0s`, so the same two atoms snap in one language and fade in another. |
| L8 | `Footer` takes its colophon as `text`, so a product speaks for itself and the package carries nobody's sentence. |
| — | `Forge` takes `host`, so the published package no longer names one workshop's private forge. |
| — | `Search` no longer carries `position: sticky` or an outer margin. A control does not get to decide where the page pins it. |
| L10 | The `.board-body > .button` rule is gone. `Board` no longer knows that `Button` exists. |
| S2 | `base.scss` in the token package holds the reset once, and both `Shell` and `Frame` use it. Sass folds the duplicate, so the base is emitted a single time however many surfaces pull it in. |
| S6 | Every component rule now sits in the `component` band, so the whole cascade is banded and nothing depends on module order. |
| P3 | `--mist` is disabled state alone. `--haze` is decoration, and the two no longer fight. |
| P4 | The ghost derives its size from `--hero`, which is what it always meant: a glyph at display scale. `--cell` is a grid column again. |
| P8 | `--haze: 0` switches the decoration off, and both Swiss and Terminal do exactly that. |
| S5 | Closed by splitting. `@perish/token` publishes the substrate on its own, and the design package depends on it. |
| S8 | The contract only fires when a consumer compiles. `svelte-package` copies `.scss` through untouched, so `pnpm build` in the package proves nothing about the themes it ships; only `apps/docs` building them caught the missing atom. A broken theme can be published and stay silent until someone downstream compiles it. |

## A grid of benches

Two columns were not a grid. Each bench stood as tall as whatever it happened
to be showing, so `Tag` was a pill twenty pixels high beside `Banner` at four
hundred, the two columns flowed past each other, and no horizontal line ran
anywhere down the page. Every heading, every fold, every card edge sat at its
own arbitrary height. The eye had nothing to rest on.

The gallery could not fix it, because the app layer writes no CSS and the
library had nothing that bounds a view. `Frame` is a measure and a centring,
`Board` is a titled panel, `Card` is a note with a rule down its side. None of
them says *this region is a fixed window onto one thing*, which is the shape
every component catalogue in the world is built out of.

| # | Entry |
|---|---|
| P23 | `Stage` is a generator, filed under `enclose`. It holds a three by two window, centres what it is given, and crops what does not fit. Forty one benches are one height now, and a row reads as a row. The name was already in the repository, on a file in `apps/docs` that switches between samples — that file is `Sample` now, which is what it always was, and the name went where it belonged. |
| — | Cropping had to say so. A hard edge through the middle of a letterform reads as a rendering fault, not as a frame, and `Hero` was losing the bottom of *design* to it. The stage carries a mask that fades its last twelve percent, which lands inside its own padding, so a sample that fits is untouched and a sample that overflows is visibly still going. |
| — | `safe center` rather than `center`. A sample taller than the window would otherwise be cropped at both ends and start mid-glyph; the safe keyword drops it back to the top edge when it overflows, so every sample begins where it begins. |
| — | `Grid` lost its `loose` at the gallery's call site. Slack alignment was hiding the ragged heights it was there to tolerate, and once the benches agreed on a height there was nothing left to tolerate. |
| P24 | `Aside` did not do what its own note says. The note reads *what stands beside the main region and stays put*, and it scrolled away with everything else: a side nine hundred and forty pixels tall beside a main of eight thousand, so for seven eighths of the page a third of the window was blank. It is sticky now, with its own scroll when it outgrows the viewport. A generator whose documentation states a behaviour it does not have is a defect of the same kind as a missing atom, and it was found by scrolling rather than by reading. |
| P25 | The fold cue was the second loudest thing on every bench. `--ink` at `--body` and `--firm` put *props* one step under the component's own name and repeated it forty one times. It reads at `--fine` in `--muted` now, and brightens on hover so it still says it can be pressed. Twenty seven parts and eleven systems moved three traits each in `look.json`, and nothing else moved, which is the baseline doing its job. |
| — | The index does not know where the reader is. `Nav` takes a live flag per link and the gallery only sets it from a hash change, so scrolling past a heading marks nothing. Standing: whether following the scroll is the gallery's job or `Nav`'s is the question to answer first. |
| P26 | The library knew one page shape and it was the wrong one. `Frame` is a measure, a centring, and an edge, so every surface it holds is a measured document sixty rems wide floating in the middle of the window. Read at a gallery of forty one components it looks like a hosting company's landing page rather than a component library: a third of the window on each side holding nothing, while the benches queue up in a narrow lane down the middle. There are two page shapes in the world, not one. A measured document is the first; an application surface that fills the window with its index pinned to the edge is the second, and every catalogue, dashboard, and editor is built out of it. `Frame` takes `look`, `page` or `full`, and the gallery is `full`. Two hundred and sixty pixels of gutter became a fourth column, and the page came down from nine and a half screens to six and a half. |
| P27 | `container-type: inline-size` and shrink-to-fit are incompatible, and the stage found it the moment the columns narrowed. A container declares its inline size independent of its contents, so a generator that declares itself a container has no content width to shrink to: under `justify-items: safe center` `Board` measured two pixels, its own two borders, with everything inside it overflowing into the neighbouring bench. Every generator that answers to its own box was hit, which is `Frame`, `Board`, `Card`, `Sheet`, and a nested `Shell` — precisely the ones P16 made containers. The stage centres on one axis only now: vertically it centres, horizontally it stretches, which is what a preview of a block wants anyway. A component that declares itself a container cannot be laid out by its own width, and nothing in the library said so until a stage tried. |
| — | The head does not share the body's columns. `Banner` spans the full width while the body runs a sidebar and a main region, so the title starts on neither of them: three left edges at thirty two, one thirty seven, and three oh four. The mark is flush at least — its box was a square one point four times the display size with the glyph centred inside, so the diamond floated twenty pixels inside the page edge that everything else in the sidebar sits on. Standing: whether a head should be told about the columns beneath it, or whether the columns should be the document's rather than `Aside`'s. |
| — | The proof screen never showed this. It composes one plausible product surface, where every component is used once at the size that surface wants, so it cannot see what forty one components of unrelated sizes look like beside each other. The gallery is a second instrument and it measures a different thing: not whether the library can build a screen, but whether the library holds together as a set. `look.json` did not move on this change, which is the same fact stated by the baseline. |

## The seam under the rooms

The header asked for a shape no generator could hold: a band that is flush and
full width at the top of the page and becomes an inset, rounded, frosted bar as
it sticks. Nothing in the library could say it, and the reason was not a missing
generator. CSS has one box where every other system has two. Flutter's
`Container` is documented as sugar over `Padding` and `DecoratedBox`; Compose
makes the seam visible as modifier order, so `padding` before `background` and
`background` before `padding` differ; UIKit has a view for layout and a layer
for paint. One border box cannot hold *the space shrinks inward while the paint
stays crisp*, which is the whole of this animation.

`@perish/bone` is that seam. `Bay` reserves space and may move it: box sizing,
inline size, stickiness, and a scroll timeline. `Skin` fills its bay and paints:
background, shadow, radius, backdrop filter. They are not exported to the app
layer and never will be, because a generic box in the app layer is a generic box
in the app layer, and the instrument stops measuring the moment one exists.

| # | Entry |
|---|---|
| P28 | The package is defined by a refusal rather than by its contents: **it may not name a single atom**. `packages/bone/tests/bone.test.ts` reads its own source and fails on `var(--` or on any reach for `@perish/token`. That is what makes it structure rather than a second design layer — it knows boxes and knows nothing about language. Ectropy cannot state this yet; `ban` refuses a whole syntax inside a path and the ban needed here is narrower than `style`, so the law lives as a test until the checker can hold it. |
| P29 | Five atoms, and the shape of the addition is the prediction from the one-structure policy coming true. `--band` is the docked height, `--verge` the inset a floating band keeps, `--deck` its fill, `--ondeck` its foreground, `--fog` its veil. Forty nine atoms where there were forty four. **Five of the ten systems state `verge: 0`**, which is how a language says *I do not float* when a value is the only channel it has: Swiss, Ant, Material, Folio, Carbon and Terminal keep their band hard against the window edge, and Cupertino, Glass and Relief lift it off. The register that could not exist without a template turned out to be a length that can be zero. |
| P30 | The first real datum for the upper bound, and it is a loss. Cupertino's navigation bar is forty four points, Carbon's is forty eight pixels, Material's is sixty four, and **none of those is reachable**. One structure means one typographic treatment inside the band, and the band carries `--hero` at display size, so its height is bound to the display voice rather than to the language's own chrome scale. Every system had to state a band that fits its own hero: Swiss nine rems because its hero is four and a half, Terminal four because its hero is one and a half. The way out, if one is wanted, is to derive the title size from `--band` instead of from `--hero` — a derivation, not a second structure — and it costs the band its agreement with the display voice. Recorded, not taken. |
| P31 | `--deck` without `--ondeck` would have repeated P6 exactly. Carbon's header is black and its `--ink` is `#161616`; a band that states its own fill and borrows the page's foreground is a band that is invisible in any language whose chrome inverts. The contrast test now asserts the pairing across all ten systems and both tones, and the sheer list grew by exactly two: `cupertino.ondeck` and `glass.ondeck` are unmeasurable because their fills are translucent, which is P18's mechanism doing its job on a new atom rather than a new exception. |
| — | The morph is scroll driven, not class toggled: `animation-timeline: scroll(root block)` with `animation-range: 0 var(--band)`, so the two states interpolate over exactly the band's own height and no listener runs. Verified supported in the browser the baseline is captured in. It is the one part of this change with a real support floor; a browser without scroll timelines shows the docked state and never leaves it, which degrades to what the header was yesterday. |
| — | Two sticky layers are coupled and the coupling had to be said out loud. `Aside` takes `under`, and offsets its sidebar by `--band` when it is told there is a band above it. Composition knowledge, held by the composer, in the same way `Board` takes `seat`. |

## A drift the guards cannot see

The morph landed with a six pixel sink: everything inside the band dropped as it
detached. Two causes stacked.

| # | Entry |
|---|---|
| P32 | The inset was three sided, `verge verge 0`, so the content box lost twelve pixels of height while gaining twelve of offset, and centring split the difference. Symmetric inset holds the optical centre still: the bar closes in around what it carries instead of pushing it. |
| P33 | Under that sat a real inequality nobody had stated: **a band must be at least as tall as what it carries plus twice its verge.** Below it the flex line no longer fits, `align-content` packs it to the start, and centred silently becomes top aligned — a jump, not a squeeze. Four systems were stating a band their own content could not sit in: base at one hundred and twelve for content of one hundred, glass at ninety six for eighty eight with a sixteen pixel verge, relief at eighty eight for eighty one with sixteen, and cupertino fitting exactly with nothing to spare. Raised to 7.75, 7.5, 7.25 and 6.5 rems. This is the same coupling P30 recorded from the other side: one structure means the band's height answers to what the structure puts inside it, and a language is free to choose only above that floor. |
| — | Standing, and it is a hole in the instrument rather than in the library. `look.json` samples every part of the proof screen at rest, and the proof screen's banner does not stick, so **the entire floated state of every system is unmeasured**. A drift of exactly this kind can be reintroduced by any future change and no guard will notice. The fix is a second capture: let the proof screen carry a sticky banner, scroll to `--band`, and record the same parts again, so the baseline holds both ends of the morph. Recorded rather than taken, because doubling the baseline is its own change. |

## The platform bounces

A scroll driven morph and elastic overscroll fight over the same number. Pulling
past the top of the document carries the scroll offset outside the animation
range, so the band snaps back to its docked state while the page is rubber
banding and springs forward again when it settles. Nothing is wrong with either
mechanism; they simply both own the scroll position.

| # | Entry |
|---|---|
| P34 | The document states `overscroll-behavior: none` on the root, in the reset that `Shell` and `Frame` already share. The bounce is gone and the morph owns the scroll offset alone. A browser without scroll timelines is unaffected, and one that still overscrolls is held at the docked end by `animation-fill-mode: both` rather than being driven past it. |
| — | Worth naming as a cost rather than a fix. The bounce is not decoration on the platform this came from; it is Cupertino's own scroll feel, and the one language in the probe set that would most want it is the one that just lost it. A document level behaviour is currently structure, not vocabulary, so no language can ask for it back. If a second language ever disagrees here, the answer is an atom rather than a template — the same shape as `--verge`, a behaviour that a value can switch off. |

## Both ends of the morph

The baseline could not see a moving thing. It sampled the proof screen at rest,
and the proof screen's banner did not stick, so every floated state in the
library was unmeasured — the six pixel sink of P32 could have come back at any
time with all six guards green.

| # | Entry |
|---|---|
| P35 | The proof screen carries a sticky band now, which is what an instrument should do once the vocabulary has one, and `look.json` records the banner stack twice: at rest and at nine hundred pixels of scroll. Each part carries a `seat`, its offset inside the bay, because absolute position moves with the scroll and the thing worth holding is the offset. The table it writes is the whole experiment in eleven rows: six systems where nothing moves at all, three where the seat shifts by exactly one verge on the inline axis and not a pixel on the block axis, and one that moves on both. |

## The second disagreement

Cupertino and Material were pushed at the same part to see what a structural
disagreement looks like when it is not the first one. It looks like two atoms.

| # | Entry |
|---|---|
| P36 | Material's scrolled app bar tints and does not collapse; Cupertino's collapses its large title and blurs what passes beneath. Same generator, same DOM, same keyframes. Material states `deck` opaque, `fog: none`, `verge: 0`, `stoop: 1`; Cupertino states a translucent deck, a real blur, eight pixels of verge and `stoop: 0.55`. **The collapse is a rate whose identity is one.** That is the second time the policy's prediction has held: a move that looked like it needed a second template turned out to be a value that other languages set to the value that means *not this*. |
| P37 | The miss, and it is the real datum. iOS collapses the *bar*, ninety six points to forty four, not only the type inside it. Under one structure the bar cannot: the bay reserves its height in the flow at the top of the document, so shrinking it while stuck shortens the document and drags every later screen upward as the reader scrolls. The type collapses and the bar stays. Cupertino arrives with the right gesture at the wrong scale, and the way out is a reserved strip that is not the bar — which is a structural change, not a value. Second coordinate of the upper bound, recorded beside P30. |
| P38 | Material rendered a full bleed band with rounded lower corners, because `--radius` is the surface shape and the band is a surface. It is also a rule nobody had said: **a band cannot be more rounded than the gap it keeps from the edge.** `min(var(--radius), var(--verge))` says it, and it needs no atom — every language that states `verge: 0` gets square corners for the same reason it gets no float at all. Found by rendering Material, true of every language. |
| — | `--sink` is a registered custom property in `Banner.scss` and it is not an atom. It is the channel the collapse interpolates along, because a keyframe cannot animate a value into `font-size` without one, and an unregistered property would flip at the halfway point instead of sliding. It lives in the design layer because the bone package may not write `var(--` at all. The distinction to keep: an atom is what a language states, a registered channel is how a component moves. |

## Eleven voices, one part

The one thing this repository can do that no other component library can was
reachable only through a dropdown that showed one language at a time. Reading
Swiss after Material is not comparing them.

| # | Entry |
|---|---|
| P39 | `all eleven` is a value of the system picker rather than a second screen. Choosing it turns the page inside out: instead of forty one components in one language it shows one component in eleven, and the index in the sidebar becomes the selector. Nothing new was needed to navigate it — the hash already carried the reader's position and `Nav` already took a live flag per link, so the selection and the marking were both already there and only had to be pointed at each other. The scroll-spy gap recorded earlier disappears in this mode for the same reason: the hash is the state, not a scroll target. |
| — | The stage grew a hairline. Side by side, a language whose ground equals its panel had an invisible viewport — Ant, Swiss and Cupertino showed a component floating in nothing while base showed a framed one, and the difference read as a rendering fault rather than as a palette. `var(--line) solid var(--rule)` says where the view is in every language, and Brutal states it as a black three pixel rule for the same reason it states everything else that way. Found by comparison, invisible in isolation, which is the argument for the screen in one line. |

| # | Entry |
|---|---|
| — | Correction to P29, kept beside it. The atom count in it was inherited from an entry that had gone stale: the contract required forty nine before the band was built, not forty four, so the five that followed made fifty four and `--stoop` made fifty five. Counted from `$dressed` itself rather than from an older sentence, which is the only count that is ever true. |

## A front door

The site opened straight into a catalogue of forty one benches, which tells a
reader what the library contains and nothing about why it exists. The gallery
moved to `/gallery/` and the root became a page that makes the claim and then
demonstrates it above the fold.

| # | Entry |
|---|---|
| P40 | The landing is written in the same app layer as everything else: no CSS, no native tag, nothing but the library. It came out of existing generators without asking for one new thing, and two of them finally earned the place they were built for — `Rail` carries the six rooms as numbered stops, and `Ledger` carries the count as a tabular tally with a dotted leader. Both were recorded under *standing well* long before there was a page that needed them. |
| — | The demonstration is `Choir` again, four voices instead of eleven, which is the argument the whole repository makes reduced to one screenful: the same button, four languages, no branch in the code. Reusing the gallery's own component rather than writing a marketing mock means the front page cannot lie about what the library does. |
| P41 | `Choir` lost its heading to the caller. The gallery names the component it is comparing; the landing names the point it is making. A component that renders both its subject and its own caption cannot serve two callers, and the caption was never the comparison's to own. |
| — | Four voices came out as two columns, because `Grid` carries a rule that turns exactly two or exactly four children into two columns at wide widths. It is a good rule for a page of cards and the wrong one for a comparison strip, so `Choir` takes `cols` and the landing states four. Recorded because the rule is invisible until a caller wants four of something in a row. |

## Three drafts, and a law that filed them

Removing defects converges on *nothing is wrong*, which is the other way of
saying one out of ten. The pages had stopped being wrong and had still not
started saying anything: every heading at one weight, every section at one
rhythm, one accent that appears only in links, no inversion anywhere, and a
display size that shows up once and never again. That is not restraint, it is
the absence of a claim — the same fault that made base the average of ten
languages in the first place.

Taste has no verification loop available to a machine, so the move is to stop
delivering one polished answer and start delivering positions to choose between.
The substrate already makes a position cheap: a theme is a data file, and the
contrast contract holds a draft to the same bar as a shipped language.

| # | Entry |
|---|---|
| P42 | Three drafts for base, each a stated commitment rather than a slider setting. `paper` is editorial: warm ground, prose set in the display face, one brick red, no shadow and no corner anywhere, generous leading. `console` is a workbench: dark, every face technical, dense spacing, one electric accent, almost no shape. `signal` is a product speaking loudly: white, a five rem grotesque at weight eight hundred, a real elevation, pill controls, electric blue. All three clear the same contrast assertions the ten languages clear, and `signal.ondeck` joined the sheer list because its band is translucent. |
| P43 | The drift guard earned itself on its first run, on a theme written minutes earlier: it refused `signal` at fourteen pixels. Correction to P33, kept beside it — the inequality was a symptom, not the cause. `.banner` wraps, and a wrapped flex container distributes its spare height *between lines* under the default `align-content`, so the first line sits at a position that depends on the container's height and moves the moment the band insets. `align-content: center` centres the block of lines instead, and the centre stays put whatever the height. The inequality still has to hold to avoid clipping, but it was never what made the type move. |
| P44 | Third sighting of the same coupling, and the first one measured in pixels. `signal` states a five rem display voice, the band carries that voice, the actions wrap under it, and the band has to be **eleven and a half rems — a hundred and eighty four pixels of chrome** — for the content to fit without clipping. P30 recorded that the authentic chrome heights were unreachable; P37 recorded that the bar cannot collapse; this one prices the coupling. Three independent sightings now argue for the escape P30 named: derive the band's title size from `--band` rather than from `--hero`, which is a derivation and not a second structure. Not taken, because it changes the header's typographic identity in every language and that is the author's call. |
| P45 | `ectropy` refused the drafts and the refusal was correct. Thirteen files under `themes/system` broke `fanout`, and the question the law asks is never *can the shelf be longer* but *is the newcomer the same kind of thing*. It is not: ten languages are probes borrowed from the world, three drafts are proposals for the one language this repository authors. They live under `themes/draft` now, the system room is back at ten of ten, and a category error that had been invisible for an hour was found by a directory count. |

## One page, layout and type only

Judged on layout and type alone, with colour and ornament set aside, the front
page was still under half. Measured rather than felt: **five unrelated widths on
one page** — 1376 for headings and rules, 672 for prose, 338 for the brand, 282
for a board title — **ninety five characters to a line** at sixteen pixels, and
**every section heading identical** at twenty eight pixels over a rule fourteen
hundred pixels long, so *Six rooms* and *Install* and a caption all carried the
same weight. The scale ran 13, 16, 18, 28, 56: ratios of 1.23, 1.13, 1.55, 2.0,
neither regular nor deliberately contrasted.

| # | Entry |
|---|---|
| P46 | Two measures with a stated relationship, and everything sits on one of them. `--prose` is the reading measure at thirty four rems, sixty eight characters at the body size, and `Frame look="read"` is that measure times one and a half for the things that are not read but looked at: demos, code, tallies. Text inside artefacts, artefacts inside the column, one left edge. |
| P47 | The scale is 13, 16, 20, 28, 48 now, and the step from body to lead is a real one rather than a rounding. `--tight` came to 1.1 so display lines set as blocks rather than as paragraphs, and `--space-6` to five rems so that the gap between sections is three times the gap inside one. Rhythm is what separates a page into parts, and one gap everywhere is no rhythm at all. |
| P48 | `Head` takes `look`. A section head is `--title` with a rule and a section's worth of space above it; a caption over the thing it names is `--lead` with neither. One heading that serves both is the typographic equivalent of one token serving two roles, and the page had eight of them at one weight. |
| P49 | **A brand is not a headline, and that closes P30, P37 and P44.** The banner set its title in `--hero`, so the band carried the display voice and its height was bound to it — three sightings, the last priced at a hundred and eighty four pixels of chrome for a five rem voice. The brand reads at `--title` now, on one line, with the tagline moved out of the chrome and onto the page. Every language states its own chrome height at last: Carbon three rems, Cupertino three and a half, Material four, Terminal three. The escape P30 named was *derive the band's type from the band*; the route actually taken was the typographic argument, and it arrives at the same place from the other side. |
| P50 | The reading measure landed exactly on the container breakpoint. `$seam` is forty eight rems and the read column was `--prose` times the square root of two, which is 48.08 rems, so every component inside a measured column believed it was on a narrow screen and stacked: `Rail` came out as six rows six hundred pixels tall. One and a half puts the column at fifty one rems and the components read wide again. A measure system and a breakpoint system that share no arithmetic will collide exactly once, silently, and look like a component bug. |
| — | `Rail` was a flex row with no wrap, so six stops in eight hundred pixels became six columns of a hundred and eight. It wraps at `--cell` now. Found by putting it in a narrower column than it had ever been in, which is what a second page is for. |

## The same page, again

Second pass on one page, still layout and type only, still measured before it was
changed. The rhythm from the first pass held — eighty pixels between sections
against twenty four inside one — and four things it had not reached showed up in
the numbers.

| # | Entry |
|---|---|
| P51 | The display block did not breathe. Sixteen pixels between the claim and the first paragraph, which is **less than the gap between two paragraphs inside a section**, so the largest type on the page was tighter to its neighbour than body text is. `Hero` closes with a section's worth of space now. A block set at three times the body size cannot be separated by less than body spacing. |
| P52 | A section heading over a rule the full width of the page, to introduce one word. The rule is a mark, not a cut: `Head` draws a short one at `--space-6` wide above the heading instead of a hairline across the column. Space was already doing the separating; the line was only saying *here*, and a line that long says *stop*. |
| P53 | `Stage` was one shape for two jobs. A three by two window is right for a bench that has to hold anything, and wrong for a button: four of them cost six hundred and sixty five pixels of page to show four buttons, ninety five percent of it empty. `look` takes `view` or `strip`, three by one, and the front page's demonstration lost half its height without losing a pixel of what it demonstrates. |
| P54 | *The count* had a full section heading, a short rule and eighty pixels of air introducing a forty five pixel strip of four numbers. **A heading's weight is a promise about what follows it.** It reads at `--lead` now and sits with the rooms, where it belongs, because a tally of the rooms is a fact about that section rather than a section of its own. |
| — | The hero's ornament was a hundred and twenty five pixel lozenge floating in the right margin of a measured column, reading as an accident rather than as a decision. It is four times the display size now and hangs past the column's edge, so the column crops it. A form that is cropped is a form somebody placed; a form that floats is a form nobody did. |

## The type was never set

Two rounds of measures and rhythm moved nothing, because the largest type on the
page was badly set and no amount of spacing repairs that.

| # | Entry |
|---|---|
| P55 | **Only one cut of Spectral was ever loaded.** Six hundred weight, upright, and nothing else. Every serif on the site that asked for four hundred got the six hundred face, and `Banner`'s tagline, which asks for italic, got a **mechanically slanted upright** — the browser shearing a roman because it had no italic to use. A faux italic in the first sixty pixels of the page is the single loudest thing on it, and it had been there since the day the face was added. Four hundred, four hundred italic, six hundred and six hundred italic are loaded now, in both unicode ranges. |
| P56 | Display type wants less weight, not more. `--heft` was six hundred, so the claim was set in a bold serif at forty eight pixels, which reads as a headline in a newspaper rather than as a title on a page. Base states four hundred now: the strokes open, the counters breathe, and the size does the work the weight was doing badly. The other languages are unaffected — each states its own. |
| P57 | I had tightened `--tight` to 1.1 in the first pass and that was over-correction: two lines of forty eight pixel serif at 1.1 close up into a slab. 1.16. And the supporting line sat sixteen pixels under a forty eight pixel display, which is the same mistake as P51 one level down; it takes a section's worth of space now. |
| P58 | The claim could not break well at any measure, and the arithmetic says so rather than the eye: *One structure. Eleven* is four hundred and fifty eight pixels wide and *Eleven design languages.* is five hundred and twenty five, so **no column exists that puts the break on the full stop** — one is always too wide or the other too narrow. The copy was the variable, not the measure. Reversed to *Eleven design languages. One structure.*, measured to `--prose`, it sets as five hundred and twenty five over three hundred and four: a descending rag with the break on the sentence. `text-wrap: balance` was making it worse, equalising the lines into a block. |
| — | The brand read as a headline in miniature: `--title`, the same face and weight as a section heading. It reads at `--lead` with a hair of positive tracking now, which is what tells an eye *this is a mark* rather than *this is the top of the article*. |

| # | Entry |
|---|---|
| S9 | Standing, and parked deliberately rather than forgotten. *perish design* is a name set in a typeface, not a mark: there is no directed design behind it, no relationship between the two words, no drawing. Everything typography can do for it has been done — the right cut, chrome size, a hair of tracking, the page's left edge — and what is left is authorship of a wordmark, which is not a defect the library can be asked to fix. Recorded so that the next reader knows it was seen and set aside, not missed. |

## A boundary nobody could see

Three complaints — the field is bare, the subject does not separate from it, the
margins are wrong — turned out to be one, and it was measurable before it was
argued about. Text contrast has been asserted since the beginning. **Non-text
contrast never was**, and WCAG 1.4.11 asks for three to one on anything whose
boundary identifies a component.

| # | Entry |
|---|---|
| P59 | Every boundary in the library, in every language, measured between **one point zero seven and one point seven one** against what it bounds. A card against its page: 1.16. An input against its page: 1.07. A border against its own surface: 1.43. Three languages passed — Swiss and Brutal at twenty one, Carbon at 3.32 — and those are exactly the three whose identity *is* the line. The rest were drawing decoration and calling it structure. |
| P60 | One token was doing two jobs, which is the oldest entry in this ledger wearing new clothes. A divider inside a surface and the boundary that says *this is a component* are different registers, and every mature system splits them: Material's `outline` against `outlineVariant`, Radix's step seven against step six. `--edge` is the strong one and must clear three to one against both `--panel` and `--ground`; `--rule` stays the quiet one. Eighteen component boundaries moved to `--edge`, sixteen dividers stayed. |
| P61 | The values were derived rather than chosen: for each language, blend its own `--muted` toward its lighter surface until the ratio lands near three point two, then check the darker one. Swiss and Brutal keep their black, Carbon keeps the grey it already had. Nobody picked a colour by eye, and every language still sounds like itself. |
| P62 | The assertion is the deliverable, not the values. `packages/design/tests/theme.test.ts` now refuses any language whose boundary falls under three to one, and declares the unmeasurable set exactly — `glass.seam` and `glass.rim`, because a translucent surface has no fixed thing to be measured against. A new language cannot ship a boundary nobody can see. |
| — | Still standing, and now more visible than before: `panel` against `ground` measures between **1.00 and 1.16 in every one of the fifteen palettes**. The surfaces are drawn now, but the field they sit on has no steps at all. That is the next entry, and it is what *the background is bare* actually means. |

## A field with steps

The boundary work was real and invisible: a one pixel hairline at three to one is
perceptible in a standards test and not in a page. What is felt is the step
between a surface and the field it sits on, and that step measured **1.00 to
1.16 in every one of the fifteen palettes**. A card was not a card; it was a
rectangle of the same colour as the page with a line drawn round it.

| # | Entry |
|---|---|
| P63 | Base's light tone is a ramp cut from one blue grey now, not a grey page with a pure white card. Page `#d5dce7`, surface `#fcfdfd`, recessed `#c0ccdc`: **1.35 between the page and a surface**, 1.18 between the page and a well. Dark answers the same shape at 1.27. The rule that made it a ramp rather than three colours: **a tinted neutral may not be mixed with pure white**, because the tint then reads as dirt on the page rather than as the temperature of the whole family. Every step is cut from the same anchor. |
| P64 | `--lift` carries two layers now, a tight one and a wide one, because a single shadow reads as a sticker. It is the same reason Material states two and the reason P19 kept the atom universal rather than a scale: Brutal states one hard offset and means it. |
| P65 | The contrast assertion caught the consequence within a minute of the change: dropping the page from near white to `#d5dce7` pushed `light.muted` to 4.36 against it, and the test named the pairing and the number. Secondary text moved three steps darker and it clears. **A palette is a system of constraints, and a system that is only checked by eye is checked nowhere** — this is the second time in one session that the guard found the thing the change broke before anyone looked at a screen. |
| — | Standing, and it is the last of the three complaints: the measured column still floats in an undifferentiated field, so the margins read as unused rather than as part of the page. The practice that answers it is the one every landing page uses — full bleed sections carrying the surface, an inner column carrying the measure — and it is reachable now that the field has steps to alternate between. |

## The desk was missing, not the line

Two passes at *the subject does not separate from the background* went to the
wrong place, and the correction is worth keeping because the mistake was a
reading error rather than a craft one. I read the complaint as *cards do not
separate from the page* and spent a pass on boundaries and a pass on surface
steps. **Most of the page has no cards.** The prose, the headings, the rail and
the tally sit directly on the field, so there was nothing for a boundary to
separate: the thing that failed to separate from the background was **the
document itself**.

| # | Entry |
|---|---|
| P66 | `Frame` takes `sheet`. The measured column is painted, edged, raised and set on the field, and the field becomes a desk. Both remaining complaints close at once: the subject separates because it is a surface rather than a region of the page, and **the margins stop reading as unused because they are now what the document is lying on**. It is the oldest answer in the trade — paper on a desk — and no atom was needed for it, only the ramp from the previous entry to give the paper something to lie on. |
| P67 | A rule the three surfaces state without meaning to: **a document sits on a sheet, an application fills the window.** The landing is `sheet`, the gallery is `full`, the proof screen is `page`. Three surfaces, three answers, and the one that was wrong was the one pretending a landing page is an application. |
| P68 | P50 came back within minutes, by a new route. The sheet's own padding took its inner width to six hundred and fifty six, under the forty eight rem container breakpoint, so every component inside stacked and `Rail` returned to a single column six hundred pixels tall. The sheet is `--prose * 1.5 + --space-6 * 2` wide now, so the *content* is the artefact measure and the padding lives outside it. **A measure that is stated as an outer width will collide with a breakpoint every time a padding changes; it has to be stated as the width of the content.** |
| — | A card on a sheet is border only, because `--panel` is the sheet and the card both. That reads as restraint rather than as a defect and is left standing deliberately: on a white document, a bordered region is what a card is. If a language ever needs a filled card on a filled sheet, the answer is Carbon's layer sets — a surface rebinding the surface token for its children — and not a fourth colour. |

## Light, and the width

Two causes, two remedies, and they are not interchangeable. *Bare* is the field
having no light; *hollow* is a portrait document displayed in a landscape frame.
Measured before the change: at fourteen forty, **the widest line of reading on
the page was five hundred and thirty six pixels, thirty seven percent of the
window**, and everything else was field.

| # | Entry |
|---|---|
| P69 | A flat fill has no light source, and a surface with no light reads as a swatch. `--wash` has been an atom since P20 and base had never used it: it states a soft radial from the top edge now, in both tones. The evidence that this was the missing thing rather than a taste was already in the probe set — Terminal and Console read as designed at a glance with identical structure, because **a dark field reads as depth for free and a flat light field is the hardest surface in interface design to make feel material.** |
| P70 | The first wash was too strong and ate the thing it was meant to help: lightening the top of the field carried `--ground` most of the way to `--panel`, so the surface step from the previous entry vanished exactly where the light was. Forty five percent white at the top, falling to nothing by sixty percent of the height, keeps the step alive at 1.25. **A light that erases the material it is lighting is not a light.** |
| P71 | The page uses its width now: the claim and the four language demonstration sit side by side at seven and five of twelve, the rooms at five and seven, install and use at six and six. **This is the first real use of the modular grid P11 built** — `Grid cols` and `Cell span` had existed for a fortnight and had never placed anything asymmetrically. Two thousand pixels of page became nineteen hundred while carrying the same content, and the void that was to the right of every paragraph is now the other half of the page. |
| P72 | `Cell` stretched its contents down the height of the tallest cell in the row, so a short column's heading floated in the middle of nothing. It aligns to the start and states its own gap. A grid cell is a place to put things at the top of, not a box to distribute things inside. |
| — | Recorded because it is the boundary of what tokens can do: **filling the width is a composition decision, not a value.** What goes beside the claim is content, and no atom can state it. The three remedies for a hollow field — use the width, make the field content, light the field — only the last one lives in the vocabulary. |

## The grid answers to its own box

| # | Entry |
|---|---|
| P73 | `Grid` wrote `grid-template-columns` as an inline style, so **no stylesheet could ever override it** and a stated column count survived every width. The twelve column front page held twelve columns at five hundred and twenty pixels, with the demonstration boards spilling out of cells a hundred pixels wide. The count travels as a custom property now and the property is read in a rule, so a container query can answer it: under the seam every grid is one column and every cell spans one. `Cell` moved the same way. The rule the two share: **an inline style is a declaration nothing can argue with, so it may carry a value but never a decision.** |
| — | The `:has` rules that turn exactly two or four children into two columns are scoped to `grid-auto` now. They are the right guess when nobody stated a count and the wrong one the moment somebody did — and they had been silently losing to the inline style, which is the only reason the seven-five split ever worked. |
| P74 | `ectropy` refused the first version of that fix, and it was right to: `style:--ruled={value}` left unparsed regions, and the coverage law admits no boundary because a clean result cannot cover terrain nobody read. **The gap was in the checker, not in the code** — an attribute name allowed one separator before each identifier, so a directive naming a custom property was unreadable. Fixed upstream in `ectropy` on `svelte-custom-property`: a separator may repeat, the design system that found it reads clean, and the design document there records the closed coverage limit. Released as Ectropy v0.7.1 through the beta promotion chain, and this repository states `style:--ruled={ruled}` again. |

## Runs across the window

The page was a stack of columns floating in a field. Measured before it was
changed: at fourteen forty the document was **eighteen hundred and eighty five
pixels tall and not one line crossed it**. The only horizontal marks anywhere
were the eighty pixel rules a `Head` draws over itself and the hairlines inside
`Rail`, both of them inside one column, both of them stopping well short of the
window. `Frame` is a measure, a centring and an edge, so everything it holds is
a column; a landing page is not built out of columns, it is built out of runs.

| # | Entry |
|---|---|
| P75 | `Course` is a generator, filed under `enclose`, and it is the second page shape the library has been missing. It bleeds to both edges, states its own block space, centres what it holds on the page's own measure, and carries `bare`, `plain`, `raise` or `well`. The landing is four courses now: ground, recessed, ground, panel. Four surfaces, four boundaries the full width of the window, and the two columns of every run finally begin on one line. The enclose room goes to six of ten. |
| P76 | `--reach` is an atom, and the register it names had been missing since the beginning: **how wide this page runs**. `--page` is a measured document, `--prose` is a reading measure, `--sheet` is a bounded surface, and none of them answers it. Carbon states 99rem because Carbon's own grid stops at fifteen eighty four; Folio states 76rem; Terminal and Brutal fill to a hundred. Fifty six atoms, and the contract stopped the build on all thirteen languages until each had answered. |
| P77 | The two columns of a run began at different heights, and the cause is a rule nobody had said. In the rooms run the left column started **eighty pixels below the top and the right one twenty four**, because `.head-loud` states `--space-6` above itself and `.rail` states `--space-4`. **A margin cannot separate sections on a page with more than one column** — it separates a child from its predecessor and says nothing at all to the column beside it. `Head`, `Hero`, `Grid`, `Rail` and `Footer` each state now that with no predecessor they take no space above. Five files, one sentence: *space above is separation from what came before, and where nothing came before the space belongs to the region.* |
| P78 | Closes the standing entry about the head not sharing the body's columns. The header centres on the same measure a course does and takes the same gutter, so docked, the brand sits exactly on the left edge of the first paragraph beneath it, in all fourteen languages and at every width. The baseline is the proof: `.mark` and `.banner h1` moved inline in every system in both the docked and the floated state, and **not one other trait of twenty seven parts moved**. What is still open is a document rather than a page: over `Frame look="page"` the bar cannot align with the column, because a document's measure and a page's reach are different numbers and the bar cannot know which one it is standing over. |
| P79 | **A band that carries a surface spends the surface of what it holds.** The install run was given `well` and its `Code` blocks vanished, because `Code` reads `--well` too; given `raise`, the demonstration's white `Board` became a border on white. It is P68's card on a sheet, one level up and unavoidable: three steps is the whole material vocabulary of a page, and a band takes one of them the moment it takes any. The runs alternate ground, well, ground, panel so that everything standing on them has a step left to stand on. |
| P80 | The look lane could not start, and the failure read as a JSON parse error three frames from the cause. It served `dist` with `python3 -m http.server` and asked for `/proof/`, which is a client route and not a file, so the capture ran against the server's own 404 page and `.banner-bay` was null. It runs `vite preview` now, which falls back to the app, bound explicitly to `127.0.0.1` because vite's default localhost resolves to `::1` while the test dials the dotted quad. **A guard that cannot start is worse than no guard**: this one was green in every lane that runs it, because the lane that runs it is a hand. |
| — | Standing, and it is the same hole P35 closed for the floating band, reopened one level up: `look.json` samples the proof screen, the proof screen is a measured document, and no course appears in it. **No band's colour, edge, or block space is measured anywhere.** The landing is the only screen that carries one and the lane never visits it. |
| — | Standing, two gaps found by wanting one thing. The landing has no call to action, and it cannot have one: `Button` owns a press and `Link` is a text link, so nothing in the library navigates and reads as a control. Nor can the app layer put two controls in a row flush left — `Split` states two sides and pushes them to the ends of whatever holds it. A hero's actions are a sequence, not a split. |

## Three voices where there were two

Three complaints, and each one had a structural cause rather than a taste:
*too much dead space*, *nothing here wants to be read*, *the cards are stiff and
show nothing*. The first was leftover rather than air, the second was an atom
that had never been stated, and the third was base wearing a language's button.

| # | Entry |
|---|---|
| P81 | **base had never stated a reading voice.** `--plain` said `system-ui`, which is not a choice, it is the absence of one — and it could not be fixed in place, because one atom was carrying two roles: the voice a page is read in and the voice a control is labelled in. `--brisk` splits them. Base reads in Spectral at seventeen pixels over a leading of 1.7 and operates in `system-ui`; every other language answered `brisk` with exactly what it already said for `plain`, so the split cost thirteen languages nothing and gave base a voice. Fifty seven atoms. |
| P82 | **The shell restated the palette and forgot the type.** `base.scss` set `font-family`, `font-size` and `line-height` on `body`, which sits *above* the element carrying `data-system`, so all three `var()`s resolved at the root and every descendant inherited base's computed answer. Terminal's proof screen has been setting its prose in `system-ui` since the day Terminal existed; Carbon has never used Plex Sans for anything it did not name by hand. `.shell` states the three now, exactly as it already stated `--ground` and `--ink`. **A var() consumed above the attribute that answers it is a constant.** Thirteen of the fourteen languages moved in the baseline; `signal` states `system-ui` and so had nothing to move, which is also why the fault was invisible for so long — base's value was everybody's answer. |
| P83 | Display type was measured with the reading measure. `.hero h1` capped at `--prose`, so the claim broke at sixty eight characters' worth of column whatever its size, and a display line wants twenty to thirty. It takes `--prose * 1.5` now and base's `--hero` goes to four rems: two lines of sixty four pixels across eight hundred and sixteen, which is the first thing on the page that reads as a claim rather than as a heading. |
| P84 | The card was stiff because **three of its four boxes were base's**. A voice rendered as `Board` (panel, edge, radius, lift) around `Shell` (the language's ground) around `Stage` (edge, padding) around the sample, so what a reader saw was base's rectangle with a small coloured button in it, four times over. `Board look="flush"` hands its whole body to what fills it and `Stage look="pane"` drops the frame, so the pane *is* the language's ground, edge to edge: Swiss white, Material's tinted white, Terminal and Console black, each with its own button proportions and — since P82 — its own type. Base holds the label and nothing else. |
| P85 | A view stretches and a pane centres, and the difference is which of the two is the subject. P27 made the stage stretch because a container declaring its own inline size measures two pixels under shrink-to-fit; that is right when the stage is a window onto a component. When the stage is the surface, what stands on it is an object and takes its own width. Stated as a limit rather than fixed: a container inside a pane would collapse exactly the way P27 recorded, so the pane is for what can be measured. |
| P86 | The dead space was leftover, not air, and it is measurable. Every run's two columns now begin on one line and end within a few pixels of each other: the rag per run is 0, 0, 10 and 27 pixels, where before it was 56, 16 and 32 with two holes of about a hundred and thirty. What is left is stated — eighty pixels of band padding at each edge — and the hero's own air is anchored by a mark cropped at the column edge rather than by nothing. |

## Four things that turn a reader away before they read

Reported from a glance, not from a reading: the body type is ant sized, the
card region does not say what it is for, everything that looks pressable is
inert, and the bottom is three boxes at three sizes. Each one had a cause the
page could not have argued its way out of.

| # | Entry |
|---|---|
| P87 | **A face change is a scale change, and nothing in the build says so.** The scale 13 / 17 / 20 / 28 was chosen while the reading voice was `system-ui`; Spectral carries a much smaller x-height at the same em, so the same numbers arrived a full step smaller to the eye the moment P81 landed. Base states 15 / 19 / 24 / 32 now, and `--prose` follows to thirty eight rems so the measure stays near sixty five characters rather than shrinking to fifty seven. The atom set can state a face and a size, and it cannot state that one of them moves the other. |
| P88 | The demonstration showed four boxes and never said what it was for. It carried a quiet caption where every other section carries a titled head, no sentence saying what was being compared, and no way in. And the sample was a `Button`, which shows exactly two things about a language — a fill and a radius — so Swiss and Material came out as two white rectangles. It is a `Card` now: ground against panel, an edge, a radius, both faces, the accent and a control, all in one object. **A comparison is only as legible as the widest thing being compared.** |
| P89 | Correction to P85, kept beside it. P85 said a pane centres what stands on it, because the pane is the surface and the sample is an object on it. One sample later that was wrong: a card centred at max-content is a card the width of its own title. The pane stretches like the view does, and what shows a language is the surface being allowed to behave as a surface. The reasoning in P85 was sound and it still did not survive the second sample. |
| P90 | Nothing on the page could be pressed except two links in the chrome, and three gaps this ledger had already recorded were all in the way of fixing it. `Button` takes `href` and renders an anchor in the same register, so the library has a control that navigates; `Split look="close"` seats its members together at the start instead of at the two ends, which is what a row of actions is and what *two sides* could never say; and `Rail` takes an `href` per stop, so the six rooms travel to their own shelf and answer a pointer by moving the accent onto the rule above them. Six things that looked like an index are an index. |
| P91 | The bottom was three code blocks in a two column run: two stacked on the left against one tall one on the right, three heights, not one line shared. It is one run of three steps now, each column sized to the longest line it has to carry — four, five and three of twelve — with `Cell look="fill"` ending the boxes on one line. **The rule the fill needed: the first member keeps its own height and everything after it takes the room that is left.** `align-content: stretch` alone splits the slack between the label and the box, which tilts every column by a different amount and is what made three aligned columns look ragged the first time. |
| — | Standing: the panes still do not answer a pointer, and they are the most tempting target on the page. A board that navigates is a register the library does not have, and the band's own action stands in for it until it does. |

| # | Entry |
|---|---|
| P92 | The bigger scale broke the band at narrow, and the two fixes for it are not interchangeable. The brand reads at `--title`, which P87 moved from twenty eight to thirty two, so at four hundred and twenty pixels the bar wraps to two lines and a fixed `block-size: var(--band)` cropped the wordmark. `min-block-size` looked like the fix and **the drift guard refused it in every language that floats**: a percentage height resolves against nothing when its ancestor is auto, so the skin stopped filling the bay, the docked content sat at the top of the band, and the dock and float states disagreed by exactly one verge. The band stays a stated height where it fits and becomes a minimum only under `media.narrow`, where the content is what defines it anyway. **A fixed height is what lets a percentage child mean anything**, and that is the price of one structure carrying both states. |
| — | Recorded because the same guard bit twice in one change: it also refused an inner block padding on the docked bar, which was P33's inequality again — `--band` must be at least its content plus twice its verge, and adding sixteen pixels above and below the brand put base, cupertino, glass, relief and signal under the bar. The padding is stated under `media.narrow` only, where the band grows to meet it. |

## The page says its own name

Four adjustments, taken together because each one moved a boundary rather than
a value: what the mark is, what a link is, where words live, and how long a
description is allowed to be.

| # | Entry |
|---|---|
| P93 | Closes S9, and not by drawing anything. The wordmark was parked as *a name set in a typeface, with no directed design behind it*. The name is `@perish/design` now — an at sign, a slash, two lowercase words — and it reads in `--exact` through `Banner look="exact"`. **A package name is technical text, and setting it in a book serif was the category error that made it feel undesigned.** The mark is an identifier, so it is set as one. |
| P94 | A link had one look and two jobs. `Link` takes `look`: `text` is a link inside a sentence, underlined by a gradient a hair below the baseline so a descender never collides with the rule, and it thickens from one pixel to two on hover; `nav` is chrome, so it reads in the control voice at `--muted`, carries no rule at rest, and grows an accent rule from its left edge when a pointer arrives. **A link in a paragraph and a link in a bar are one behaviour and two registers**, and the page had been paying the prose register in every bar it has. |
| P95 | Every word a person reads has left the screens. `src/lib/i18n/<tongue>/<domain>.ts` holds them, `t("front.claim")` reaches them, and the tongue is staged once by the document from its own path. Three domains — `front`, `gallery`, `notes` — two tongues, and **no screen threads a `locale` prop any more**: four components lost the prop and every label lost its ternary. The drift test asserts **key parity by walking both trees**, which is a stronger law than the one it replaces — that one only checked that no string was blank, and it could not see a key added to one tongue and forgotten in the other. |
| P96 | The notes split into text and kind, and the split was overdue. A note carried `{ kind, en, zh }` in one record, so the sentence a reader sees and the *type of control that edits the prop* sat in the same table and every new tongue would have had to restate the type. `kinds.ts` states what a prop is; `<tongue>/notes.ts` states what it says. **A structure that is identical in every language does not belong in a language file.** |
| P97 | The rail was ragged because the copy was. Six room descriptions ran from three words to seven, one of them wrapped to a second line, and no amount of layout could align a list whose members disagree on length. Every room says its job in three English words and exactly four Chinese characters now, and the three install steps do the same. **A bilingual list holds one shape only if both tongues agree on length**, which is a constraint on the writing that no generator can state and no guard can hold. |
| — | The baseline moved by four pixels on `.card` and `.footer` and nothing else, in all fourteen languages: the inline link register keeps its rule a hair below the text, and both parts hold a link. |

## A bar has two kinds of member

| # | Entry |
|---|---|
| P98 | **A preference is not a link and not a button.** The bar carried the tongue as a link that navigates and the tone as a button that toggles, so the page's two settings were dressed as the two things they are not: one as travel, one as an act. Both are a choice among named states, which is what `Pick` is for. The toggle was also hiding a state it could not say: a tone has three answers — light, dark, and *whatever the machine prefers* — and `Shell` has always supported the third by taking no tone at all, but no control had ever offered it. |
| P99 | `Pick look="bare"`. A choice in a form stacks a label over a field that fills its column; a choice in a bar is the value and nothing else. Bare moves the label into `aria-label`, drops the fill and the rule until a pointer arrives, and shrinks to its own content. It is the same shape of register as `Board look="flush"`: **a generator that lives both in a form and in chrome has to be told which one it is in.** |
| P100 | The bar had one shape for two kinds of member, and that is what made the language switch read as a link. Where a reader can go and how they want it shown are different in kind, so they are different in form now: navigation is text that grows a rule from its left edge under a pointer, a setting is a field that grows a rule around itself. **A bar has two kinds of member and they must not share a shape.** |
| P101 | The count was insider bookkeeping standing in the opening band. Forty three generators, six rooms, fifty seven atoms, eleven languages — under the heading *The count* — in the one band where not a word of that vocabulary had been introduced. It sits under the rooms now, directly after the paragraph that says what a generator is and what a room is, and its heading says what it is for: *what it is made of*. **A number is a fact only once its noun has been defined.** |
| P102 | The wordmark was loud because it was set in the serif's sizes. `@perish/design` carried `--title` at `--firm`, and **a monospace face at the same em reads larger and heavier than a serif**: even sidebearings, a bigger x-height, no thin strokes anywhere to let light through. The exact register states its own size and weight, one step down at `--lead` and `--heft`. It is P87 one level in — a face change is a scale change, and here the face changes inside a single component. |
| — | Two smaller things fell out of the same pass. The actions moved below the lede, because a claim, its line and its paragraph are one argument and a row of buttons in the middle of them is an interruption. And `.split-close` states its own space above, since a row of controls is a block in a run like any other and had been the only member of a course that stated none. |
| — | The baseline did not move by a single trait in any of the fourteen languages, which is the correct answer: the proof screen carries a `Pick` in a form and a banner in the plain register, so none of this could reach it. |

## The plugin overruled the operator

| # | Entry |
|---|---|
| P103 | The design plugin pinned `server.host = "127.0.0.1"` whenever `SIDECAR_PORT` was set, and a plugin's `config()` is merged over the command line, so `vite --host 0.0.0.0` was silently ignored: the server kept binding loopback and nothing said why. **A plugin should state what the tool cannot infer — the leased port — and never overrule what the operator asked for.** The host comes from `SIDECAR_HOST` now, defaulting to vite's own default, which is the same loopback the pin was enforcing. |
| — | The route the flag could not take is a law, not an accident. Sidecar appends `--sidecar-stamp=…` to every launch, and vite's parser refuses an unknown option, so the manifest has to end its arguments with `--`; everything after it is raw, which means a `--host` there is raw too. The only seat left is the environment, and `packages/design/src/vite/config.ts` is the one file `ectropy` grants `environment` syntax to. **The law about who may read the environment decided where this value had to live.** |

## One scale, two faces

*The default sizes are proportionally too large and the density reads as very
low.* Both halves of that are measurable, and neither is a matter of taste.

| # | Entry |
|---|---|
| P104 | **At the same em, `system-ui` and `ui-monospace` carry an x-height twenty two percent larger than Spectral** — nine pixels against eleven at 19px, measured on a canvas rather than argued. P87 raised the shared scale so that prose in Spectral could be read; every control label and every line of code took that twenty two percent with it, which is why a button was optically twenty three pixels while the paragraph beside it was fifteen. `--read` is an atom now: the size a paragraph is read at, standing beside `--prose`, the measure it is read at. Base states sixteen for the control voice and twenty for the reading one; nine languages state `read = body` because they read in the face they operate in; Folio and paper, which read in a serif, state a quarter more. **P87 said a face change is a scale change; this is the same sentence applied per role instead of per page.** |
| P105 | Density is arithmetic. Before: 1685 glyphs over 2667 by 1440 pixels, **439 glyphs per megapixel** — four to six times below an ordinary documentation page. Re-cutting the scale alone bought 478. **The larger half of the answer was not type at all: three bands out of five were using half of their width.** The claim and its paragraph now stand in one run as two columns, the rooms band splits five and seven instead of four and eight, and the page came down from 2667 to 2237 pixels carrying the same 1685 glyphs — 523 per megapixel. Sixteen percent of the page was air that carried nothing. |
| P106 | A gap paid four times. Ninety six pixels sat between the hero's supporting line and the row of actions, and no one owner could be named: the hero's own bottom padding, the line's bottom margin, the cell's `gap`, and the split's top margin each paid in full, because padding does not collapse with a margin and a grid gap collapses with nothing. Moving the actions out of the cell and into the run put both sides on margins, where the platform's own rule takes the larger rather than the sum: thirty two. **In a gapped region the region owns the space between members; in a flowed one the members do; and a member that states padding cannot take part in either.** |
| — | Three registers moved to the control voice so they survive the smaller step: a rail's description, a `Note`, and a `Card`'s body are labels rather than prose, and a serif at fourteen pixels is optically eleven. The front hero also lost its mark, which had been placed to anchor a void that is a paragraph now. |
| — | The baseline is the proof that a base-only re-cut stayed base-only: **base moved thirty five parts and every other language moved exactly one** — `.card`, whose face changed. Nothing else in thirteen languages noticed. |

## Two knobs, and they are orthogonal

*The type still feels too large, and because the type is large the spacing grew
with it, so the page reads as empty — and I cannot tell whether that emptiness
is a defect of its own.* That last clause is answerable by experiment rather
than by argument, so it was measured before anything moved.

| # | Entry |
|---|---|
| P107 | Both scales were turned separately on the live page and the page was gauged after each. Type down a tenth: **eighty pixels and nineteen glyphs per megapixel**. Space down a quarter: **three hundred and twenty three pixels and eighty eight glyphs**. Both together: four hundred and one pixels, which is the sum of the two within two pixels. **The knobs are orthogonal, and space is a four times larger lever than type.** The ink share settles it in the other direction too: shrinking type alone *lowers* the fraction of the page covered by text, from 23.3 to 21.8 percent, while shrinking space raises it to 26.5. Type was never what made the page feel empty. |
| P108 | The reason space dominates is that the two scales are unrelated by construction. `--space-1..6` are stated in root ems and `--fine..--hero` in their own; nothing in the atom set says how one relates to the other, so a language can state a compact type against a loose space and no law objects. Base was exactly that: a sixteen pixel control voice with sixty four pixel band padding, four bands deep. Base's space re-cuts to 4 / 8 / 12 / 18 / 24 / 44 and its type to 14 / 15 / 19 / 20 / 25 / 44, and the page carries the same 1685 glyphs in **1860 pixels where it once took 2667** — two screens instead of three, 629 glyphs per megapixel where it started at 439. |
| — | Recorded as the boundary of this pass: the system still cannot *state* its own density. Nothing measures the relation between the two scales, so this re-cut is a set of values that happened to be measured rather than a rule that holds. A language that wants to be dense restates eleven numbers and hopes. Whether that deserves an atom — a rate that scales the space run against the type run — or a test that asserts the ratio, is the open question; a value pass is not an answer to it. |

## The first law that is about meaning

An experiment, run to decide whether a layer above the generators — one that
states what a region is *for* rather than what it is made of — earns its
existence. The test was stated in advance: **if such a law catches something the
eye missed, the layer is real; if it only restates what is visible, it is a
naming scheme.**

| # | Entry |
|---|---|
| P109 | The landing was decomposed into five runs carrying five rhetorical roles — claim, proof, model, onramp, colophon — and eleven assertions were written about their expression, then run against the live page. **All eleven passed, and that result is worthless**, because the assertions were written while looking at the page. A law derived from the artefact can only ever describe it. Recorded because the failure mode is the whole risk of this layer: it produces nouns that decide nothing. |
| P110 | The second pass derived its laws from what a role *means* rather than from what the page does, and the first one bit. **An onramp carries a stranger from nothing to a running screen, so every step must be executable** — and the third step was not: `App.svelte` showed `<Shell>`, `<Course>` and `<Hero>` with no import, because two rounds earlier that import line had been cut to make the snippet fit a three-of-twelve column. The second step called `svelte()` that its own file never imported and its own first step never installed. **Both steps had been looked at a dozen times and read as fine, because a snippet that is column-shaped and syntactically plausible looks executable.** |
| P111 | The repair is the argument for the layer. Making every step executable forced the copy to state its imports, which forced the three columns to equal width — the layout got simpler because the content got honest, rather than the content getting cut because the layout was fixed. **The law said no to a composition the eye had accepted**, which is the test this repository applies to every law it keeps. |
| P112 | The mechanical half landed as `apps/docs/tests/onramp.test.ts`: every capitalised tag and every call in a step must be introduced by an import inside that same step, and no line may exceed the column it is displayed in. The column is not a guess — it is fifty two characters, read from the rendered box at four hundred and forty one pixels over a monospace advance of 8.43. Verified to bite by deleting the import: `App.svelte: Shell, Hero`. **This is the first guard in the repository that holds a statement about meaning rather than about shape**, and it is small precisely because only the mechanical half of an intent can be held. |
| — | The boundary this experiment found, stated for the next pass: of the twelve assertions written, five are machine-checkable (largest type, first-screen completeness, specimen divergence, stated-count equals shown-count, step self-sufficiency), four are checkable only by a person in minutes (does the model's vocabulary appear elsewhere, does the proof vary what the claim varies, is the claim repeatable by a stranger, is the onramp sufficient in fact), and three are not checkable at all and should not be written down as laws. **A role's meaning is not uniformly mechanizable, and pretending otherwise is how a paradigm becomes prose.** |
| — | Where this line lives from here: the direction above the generators — that an orchestration paradigm is a contest between an open set of tags and the infrastructure, what may and may not be stated in it, and why a template is a solution rather than a syntax — is recorded in the Concord task `perish.code/design-aesthetic-coldstart`. This ledger keeps the evidence; that task keeps the direction. **It was briefly a task of its own and was folded back: until there is a second consumer, this layer has no existence outside design, and two seats for one body of fact only drift.**
| — | The forward half of this record now has a seat: `rubric/front.toml`. A rubric states what a surface must be true of and judges nothing else; its keys are the half that is decidable and its comments are the half that is not, and **a comment becoming a key is how the paradigm is recorded as it crystallises**. Nothing reads it, deliberately — two of its fourteen laws already have a machine home and the rest are held by a person. This ledger keeps the evidence; the rubric keeps the criteria; the Concord task `perish.code/design-aesthetic-coldstart` keeps the direction.

## The claim said everything except what it was

| # | Entry |
|---|---|
| P113 | The surface never said what kind of thing it is. Measured rather than felt: **1791 characters carrying neither "Svelte" nor "CSS"**, with the category recoverable only from a `pnpm add` in the third run. The cause was an order, not a missing word — the claim block had spent all three of its text seats on the difference, so it read *difference → mechanism → difference*: a display line about eleven languages, a supporting line explaining that a theme states values and never a template, and an elaboration about eleven languages again. **A mechanism sentence was standing in the seat where a stranger needs the category.** The supporting line names the category now and the mechanism moved down into the elaboration, which is the seat mechanism belongs in. |
| P114 | The rubric's first real service was to stop a purchase. `leftover-owned` — the leftover under an unequal column must have an owner — had been written down as the one confirmed infrastructure gap on this surface, and buying it would have been wrong. The complaint it was meant to encode is *invalid whitespace*, which is interior space carrying nothing, and that was closed by P106. What the law actually measures is terminal rag, and terminal rag is closed by the run's own edge: both instances it fired on read as a paragraph ending. Retired the day it was written. |
| — | Two of the fourteen laws written for this surface were aimed at geometry when the complaint was about perception, and they fail in opposite directions: `specimens-differ` passes at 43 percent agreement while the eye still reads two of four specimens as repeats, because the eye reads the ground and the law reads traits; `leftover-owned` fired where nothing was wrong. **A law has to be aimed at the thing the complaint is about, and geometry is usually not it.** That is the first general finding about writing this kind of law, and it cost two of fourteen to learn. |

## The laws moved more than the page did

The three failing entries in `rubric/front.toml`, worked in the order the rubric
listed them. The page changed by composition and copy only — `look.json` is
byte-identical across all fourteen languages, twice over, so **nothing here was
bought from the library**. The law set, on the other hand, came out of the pass
substantially rearranged: one law gained a machine home, one was demoted to a
person permanently, one was promoted to a machine, one was retired, and two were
written. That ratio is the finding.

| # | Entry |
|---|---|
| P115 | The tally did not belong to the model run, and the argument is about sourcing rather than layout. Of its four nouns, two are said by that run's own furniture — the heading says "Six rooms" and the rail shows six — and two are said in the claim run. **A count whose nouns come from more than one run is a summary of the surface, and a summary can only be honest once the whole has been said.** The three candidates on record were its own block, the evidence block, and deletion; all three are wrong. Its own block spends a full band on four numbers on a page that just bought its density back by removing air. The evidence block relocates the violation rather than closing it, and costs `proof-varies-the-claim` its cleanliness. Deletion drops the only statement of extent the surface makes. **The seat is the colophon, and it was not chosen by taste: `counted-said` already forbade the claim run, and among the legal runs the colophon is the one whose role is extent.** |
| P116 | A tally cannot land in a colophon that is a tagline — four counts with no referent are still four counts with no unit. So the run became a colophon in fact: it names the work, states version and licence, and says how finished it is, and the counts read as an inventory beside it. Two debts closed by one cut because the seat forced it. Measured: the run went from 66 to 326 pixels and the surface from 1902 to 2021, while density rose from 606 to 624. **The page got longer because it says more, which is the only direction growth is allowed to run.** |
| P117 | `one-payload` cannot be mechanised, and the reason is a decision this line already took. A machine can only count payloads if the composition declares which member is one — and letting a run state its own role is the cascade-band proposal that was refused, because once `role="claim"` can state a value, whether a thing is a claim stops being checkable. **So the law is held by a person permanently, not for now.** What is mechanisable is never the count but the consequence: `tally-last` catches the specific way this run broke without asking anything to declare itself, and it bit when the tally was put back — *expected 2 to be 4*. |
| P118 | `exit-offered` fired on two runs and the two answers were opposite, which is why it had to be settled one run at a time rather than as a policy. The model run holds six links, one per stop of the rail, each more specific than any block-level link could be; it was read as having none because none stood in an *exit seat*. The onramp run holds none anywhere, and that is a real defect. **The restatement is the whole repair — "from anywhere inside it" moves the law off the seat and onto the thing the complaint is about, which is whether the reader can continue.** Once restated it became mechanisable, and the machine then read run 3 and only run 3, which is the evidence the restatement was right. Note the direction: the law went `reading` → `machine` by being aimed better, not by being weakened. |
| P119 | What the onramp hands on is the attribute the reader is now holding — the screen is swiss because `Shell` says so, and ten more values fit the same seat — so the exit closes the loop back to the claim at the first moment the reader can test it themselves. It stands after the payload, not beside the heading. The first attempt set the link inline in the sentence and it broke across a line and changed voice mid-clause; an exit is a member, not a word. |
| P120 | **The surface was counting eleven and showing one that is not in the eleven.** Of the four specimens, `console` lives in `themes/draft/` — it is a base candidate, not a language — so the caption "four of the eleven languages" was false. The eleven are base plus the ten in `themes/system/`. A number the surface states and a set the surface shows had drifted apart with nothing watching, and no law on the page was pointed anywhere near it. |
| P121 | Choosing the replacements produced the sharpest version of the geometry finding so far. Measured over the same eight traits `look.json` records: the old four — two near-whites, two near-blacks — have a worst pair at **59 percent** agreement; the new four, which the eye reads as four plainly different cards, have a worst pair at **69**. **The set that looks more different scores as more alike.** `relief` and `glass` share a radius, a shadow and a face while their grounds are a pale blue-grey and a purple-teal wash. `specimens-differ` is not merely silent about the complaint — on real data it runs backwards against it, and it is retired. |
| P122 | Its replacement aims at the channel the complaint actually arrives on. `grounds-differ` reads the ground out of each theme file, converts to Lab, and refuses any pair under ten units apart. Verified to bite by restoring the old four: **swiss/material 5.2 and terminal/console 3.1** — exactly the two pairs the eye called repeats, and exactly the two the trait law waved through. The threshold is a value that happened to be measured rather than a rule: ten sits in the gap between the old set's worst at 5.2 and the new set's worst at 10.1. |
| P123 | The same sentence in all four specimens is the mechanism, not noise. If the copy varied, a reader could not tell whether the difference is the language or the words. **The remedy for a real perceptual complaint was not to touch the thing complained about**: making the dressings differ enough that the eye compares grounds means it stops reading four paragraphs. |
| P124 | The onramp's first step held one line in a box stretched to the height of a five-line neighbour. The boxes size to their own content now. The distinction is exactly the one `leftover-owned` was retired for getting wrong: the void *inside* the box was interior space carrying nothing, and the ragged bottoms that replace it are terminal rag, which the run's own edge closes. **A retired law's reason outlives it and does work; the law itself would have fired here and been wrong again.** |
| — | Where the laws stand after the pass: fourteen written, one retired before (`leftover-owned`) and one retired here (`specimens-differ`), six with a machine home against two before, and one — `one-payload` — recorded as permanently a person's. **Two of fourteen were aimed at geometry and both are now retired; the two written to replace them are aimed at sourcing and at ground, and both bit on first contact.** The general finding from the last pass survives contact and sharpens: a law has to be aimed at the thing the complaint is about, and when it is not, it does not merely miss — it can score backwards. |
| — | One debt was raised rather than closed. `onramp-suffices` — the steps, run in order, produce a running screen — is marked as holding while **no step starts anything**. It is true for a reader who already has a dev server, which a stranger by definition does not. Left as holding rather than flipped, because the last pass verified it deliberately and a law should not change hands on one reading; it settles with the verification debt on that block, not separately. |

## Seven probes that were not probing

*The system still cannot state its own density* was recorded at the boundary of
P108, with the open question left as an atom or a test. Both halves turned out
to rest on a measurement that could not have been made, because more than half
the instruments were reading the same value by default.

| # | Entry |
|---|---|
| P125 | **Seven of the thirteen languages state the identical spatial rhythm** — `0.25 0.5 1 1.5 2 4rem`, which is the ordinary four-pixel grid every stylesheet starts from. ant, brutal, cupertino, folio, glass, material and relief carry it while their type scales differ wildly, so Folio the serif reading language and Ant the compact enterprise language claimed to breathe identically. That is not a decision taken seven times, it is a default nobody re-cut. **The conclusion of P108 was drawn from a probe set that was fifty four percent unauthored**, which means the completeness oracle this repository runs on had never actually been run for space. Held now by a law in `theme.test.ts`: no two languages may state the same spatial rhythm, and it named all seven the day it was written. |
| P126 | The seven were re-cut from the published spacing of the systems they stand for, and the same page was then gauged in every language at a fixed width. **The set now spans 237 to 586 glyphs per megapixel, a factor of two and a half**, against a set where seven of fourteen were pinned together. The prediction stated before the re-cut was that if the atom set is complete every rhythm would be sayable with the six existing space atoms and nothing else. **It was: all seven, no purchase.** What no language could say was a *relation* rather than a value, which is the P108 complaint restated rather than answered. |
| P127 | The relation is sayable, and one language already says it. On the `[data-system]` element, `1ch` measures 8.42px in terminal, `1em` measures 14px, and `1rem` measures 16px: **`ch` and `em` follow the language's own face and size, `rem` refuses to**. Terminal is the only one of fourteen that states its spaces in `ch`; the other twelve state `rem`, which is not a neutral choice but an explicit opt-out. **The expressive power was never missing. The requirement to author was.** |
| P128 | And then the same measurement killed the atom it seemed to argue for. **Terminal — the one language that ties its space to its own face — measured thirteenth of fourteen in density**, looser than a printed page. `ch` is the *advance* of a monospace face, and a monospace advance is wide relative to its size, so tying space to the face makes the language whose identity is density render loose. **The one language practising the proposed rate got the opposite of the intended result**, which retires the idea of an atom that scales space against type on evidence rather than on preference. |
| P129 | The rate does exist, but as a diagnostic rather than a generator. Across fourteen languages, `space-3` over the control voice predicts measured density at **r = −0.75**, and it predicts it better than the band steps do (`space-5` at −0.54, `space-6` at −0.57). **Density is governed by the interior step, not by the space between bands** — the workhorse gap appears many times per page while the band inset appears once. But the seven authored runs have genuinely different shapes, so no single rate generates a run: it measures one. **An atom would have had to fix the shape, and the shape is exactly what a language authors.** So the answer to P108 is a test, and the evidence for it is that the alternative was tried and lost. |
| P130 | The law was written scale-free to avoid inventing a threshold, the failure mode `grounds-differ` had to justify with a gap in the data. It states a partial order between languages as design facts — carbon denser than folio, console and terminal denser than paper, ant denser than glass, swiss denser than brutal — and asserts the measured order agrees. **It fired on exactly one pair, and on the one the measurement had already flagged: `terminal 345 is not denser than paper 349`.** Terminal keeps `ch`, which is its authored relation, and takes smaller multiples of it; it reads 382 now and clears both paper and signal. |
| — | What this line did not find, stated because a null result is the point of an oracle: **nothing about base**. All fourteen rhythms were sayable, base moved zero traits, and no atom was owed. The density gauge is recorded per language in `look.json` from here, so a re-cut that moves density can no longer pass unremarked — which is the concrete form of *no law objects*, the second half of the P108 complaint. |
| — | One candidate found and deliberately not bought. `--space-3` serves both the reading voice and the control voice: a paragraph in base is separated by 12px against a 28.5px reading line, or 0.42 of a line, while a control gap is 12px against a 22.5px line, or 0.53. **That is P81 exactly — one atom carrying two roles — one layer down, and it is on base.** It is not bought because nobody has complained that base's paragraphs read wrong, and P114 is the standing reminder that a law or an atom written against an uncomplained-about defect is a purchase that should not be made. Recorded with its numbers so the complaint, if it comes, arrives with the measurement already taken. |

## The fix that made the defect

Recorded one entry earlier as a candidate found and deliberately not bought,
on the grounds that nobody had complained. Measuring it properly showed the
grounds were wrong: the complaint was made in P104 and only half serviced.

| # | Entry |
|---|---|
| P131 | Paragraph separation was measured in reading lines across all fourteen languages, beside the same figure in control lines. **Eleven of the fourteen show no difference at all**, and the three that do — base, paper, folio — are exactly the three whose reading voice is a different size from their control voice. That is not a coincidence, it is the definition: the two figures diverge only when `read` differs from `body`. **P104 created this class of language and this defect in the same stroke.** It gave type a second ruler because one scale cannot serve two faces, and never gave space one. |
| P132 | This overturns the refusal recorded one entry earlier, and the reason is worth more than the reversal. P114 forbids buying against a defect nobody has complained about, and that reading was wrong here: **the complaint is P104's own, and it was answered for type and left unanswered for space.** An unfinished half of a serviced complaint is not an uncomplained-about defect. The test for a purchase is not whether someone said the words again, it is whether a recorded complaint still stands somewhere it was never carried. |
| P133 | The repair is surgical because `--read` has exactly one consumer in the whole library — `Text` — while `--space-3` has twenty four. So the two voices meet in one component, and one atom closes it. `--apart` states how far two paragraphs stand apart in reading lines, and `Text` spends it as `calc(1em * var(--leading) * var(--apart))`, which is one reading line times the rate because `1em` inside `.text` is `--read`. Base went from **0.42 to 0.60 reading lines**; the conventional floor for unindented paragraph separation is half a line, and base was under it precisely because it had inherited a value sized for a voice twenty one percent smaller. |
| P134 | The eleven single-voice languages state the ratio they already had, and that is not the seven copycats repeating themselves: **for a language that reads in the face it operates in, prose rhythm equal to control rhythm is correct by construction rather than unchosen.** The claim was checked rather than asserted. Re-capturing the baseline moved **base, folio and paper and nothing else — four traits in fourteen languages.** An atom whose blast radius is exactly the set of languages carrying the defect is the shape an atom should have. |
| — | One thing looked for and not found. A paragraph's trailing margin inside a grid `Cell` should be a gap paid twice (P106), since a grid gap collapses with nothing — but on this surface every lone paragraph sits beside a taller sibling, so its trailing margin never set a row height and never cost anything. `.text:last-child` drops the margin anyway, because a member should not state space the region owns, but the expected saving was zero and is recorded as zero rather than claimed. |
| — | The instrument built one commit earlier is what made this visible at all: `.text` is not among the parts `look.json` samples, so nothing in the old baseline would have moved. **The density figure added to the baseline in the previous pass is the only reason base's row changed.** That is what compounding looks like in this ledger — the measurement bought last is the one that priced this. |

## Eight pixels short of the proof

| # | Entry |
|---|---|
| P135 | The surface exists to show that eleven languages look nothing alike, and at the reference 1440 by 900 **not one complete specimen stood inside the first screen**. The first card ran 633 to 908 against a fold at 900. **It missed by eight pixels**, which is exactly why nothing had complained: the eye was told there were no one-glance defects left, and a near-miss is not a defect, it is an absence of evidence at the one moment evidence is free. |
| P136 | The space was above it, and P106 already names the fault. Between the claim's supporting line and the row of actions sat sixty pixels with **three owners paying in full**: the paragraph's margin of twelve, the hero's own bottom padding of twenty four, and the grid's bottom margin of twenty four — where the system's own step for that relationship is twenty four. The previous pass fixed one instance of this at a different seat and did not state the rule, so it grew back. **A member does not state trailing space; the region between members owns it.** `.cell > :last-child` and `.hero:last-child` say so now, alongside the `.text:last-child` written one commit earlier for the same reason. |
| P137 | The page came down from 2189 to **2111 pixels** carrying the same 1967 glyphs — 624 to **647** per megapixel — and all four specimens now stand whole above the fold with sixteen pixels to spare. |
| — | A correction to the instrument, and it matters more than the fix. **`look.json` moved zero traits on this change**, because it samples `/proof/`, not this surface. The predictor used all session — that base's rows in `look.json` move when the score moves — held historically only because every scoring change so far altered tokens or generators, which move every surface at once. A composition rule that changes `/` by seventy eight pixels and leaves `/proof/` untouched breaks the correlation. **The baseline's silence is not evidence that the scored page did not change**, and from here the front surface is gauged on its own. |

## The room that draws things was full

| # | Entry |
|---|---|
| P138 | The library drew **no symbols at all**. The disclosure cue, the checkbox tick, the select arrow and the copy affordance were text or native browser chrome; `Face` fell back to two initials; the only icon anywhere was a Unicode character the application hard-coded into a `Banner`. A design system whose controls are drawn by the browser is the strongest possible tell that a page is typeset rather than designed. |
| P139 | The seat is `Sign`, and the division follows the one the system already makes for text: **the library ships no shapes for a language, it ships the seat**. Base states a set of eight semantics — `fold` `tick` `copy` `find` `away` `warn` `next` `pick` — each derived from a place the library was already standing words in for a symbol, so every one had a consumer the day it was written. Two atoms carry the treatment: `--sign` for the size a symbol is drawn at and `--nib` for its stroke. **`--nib` is the thesis in miniature** — one set of paths, fourteen weights, from carbon at 1.5 to brutal at 3, and no language owns a shape to get there. |
| P140 | Adding the first symbol generator **overflowed the room that draws things**: `mark` went to eleven against a fanout limit of ten. The limit was right and the finding was real. `Line` renders a name on one side and members on the other under a rule, with `justify-content: space-between` and nothing of its own drawn — **it is `Split` plus a name and a rule, and `Split` lives in `arrange`.** Moved there. The room was not full of marks, it was holding one thing that never belonged. |
| — | A symbol placed without a seat is worse than no symbol. The rail's arrows first landed as a fourth row inside a column-flowed stop, reading as six orphaned glyphs; they sit in the head row now, right-aligned, and the six stops finally look like the links they have always been. Recorded because the same mistake is available at every one of the eight seats. |
| — | What is not yet in place, stated so it is not mistaken for done: **semantic symmetry is not enforced**, because base is the only set that exists. The contract — every language answers every semantic, and a language that cannot is the finding — needs a second set before a guard can hold it. |

## Six rooms, drawn

| # | Entry |
|---|---|
| P141 | The first pass put a symbol at every place a control needed an affordance and **not one place where a symbol could say something**. All eight were eighteen pixels, sitting beside text: the page gained texture and no mass. The six rooms — the axis the whole library is filed on — were still six words and a list. **Six drawn marks at plate scale are the architecture diagram**, and they close three complaints at once: symbols that carry meaning, a graphic with weight, and the one run whose role owed a resource and had none. |
| P142 | Recorded as the price, because it is real: the model run went from 298 to 413 pixels and the surface density from 646 to **613** glyphs per megapixel. Graphic mass costs density by definition. The `dense enough to read as a tool` tag still holds — 613 against 439 at the start of this line — but the two are now in tension and the next density claim has to be made against this number, not the old one. |
| P143 | The shapes left the library the day the second dimension appeared. **`@perish/sign` holds them and knows nothing about Svelte, generators or `design`**, exactly as `@perish/token` holds atoms and knows nothing about who spends them. The reason is a growth curve, not tidiness: shapes multiply as **system × preference** while generators do not multiply at all, and a package whose contents grow on a different axis from its host does not belong inside it. Each set is its own export entry, so a consumer pays for the sets it names and **the export map is the roster of sets, in one seat**. |

## A second set, and the contract it makes checkable

| # | Entry |
|---|---|
| P144 | Material was chosen as the second set because it breaks the assumption the seat was built on. Base is drawn in line: `fill: none`, `stroke: currentColor`, weight from `--nib`. **Material Symbols are solid**, so the seat had to stop assuming a medium. A set states its own `cut` — `line` or `solid` — and the shape carries its treatment, which was the position argued when the seat was designed and is now tested rather than asserted. Solid sets take `fill-rule: evenodd`, so a counter-drawn subpath is a hole rather than an accident. |
| P145 | The oracle's first report on the atom set: **material states `--nib` and never spends it.** A solid set has no stroke, so the weight atom is inert for it, exactly as `--exact` is inert for a language that shows no code. The atom set is not wrong — an atom a language declares and does not consume is the price of the completeness rule that every language declares every atom — but it is the first place where a language pays for a value it cannot use, and the second solid set will pay it again. |
| P146 | The seat could not know which language it was inside. A set is chosen at render time while `data-system` is a style-time fact, so `Shell` now hands the system down as context and `Sign` reads it. **This is the first fact the library passes down outside the cascade**, and it is worth naming why it was allowed: the cascade carries how a thing looks, and the shape of a symbol is not a look, it is content selected by a look. A nested `Shell` overrides it, which is exactly what the gallery needs to stand fourteen languages side by side. |
| P147 | The contract is a guard now. `base` is the roster — the authored language states which semantics exist — and every other set must answer all of them and invent none. Verified to bite in both directions by renaming one of material's entries: **`material says nothing for pick` and `material invents shut`**. Symmetry was the whole point of shipping sets per language rather than one icon font, and until this pass it was an intention rather than a fact. |

## Half a roster a text medium cannot say

| # | Entry |
|---|---|
| P148 | Terminal answers in a medium the seat did not have. Its symbols are **characters set in its own face**, not paths, so `cut` grew a third value and `Sign` renders a span rather than an `svg`. The best evidence that this is right rather than a concession: **terminal's `find` is `/`**, which is what search actually is in a terminal, and it reads better beside monospace text than any magnifier could. A language answering in its own medium beats a language answering in the seat's. |
| P149 | **Terminal can say seven of fourteen and refuses seven**, and the split is not arbitrary. Everything it answers is an *operation* — fold, tick, find, away, warn, next, pick — and everything it refuses is, apart from copy, one of the six rooms. **A text medium can point but it cannot depict.** Arrows, ticks and carets are in the character set because terminals have always needed to point; nothing in it means "places its members". Half the roster being unsayable in the oldest medium on the list is the sharpest thing the oracle has produced. |
| P150 | The refusal is a first-class answer and the guard enforces the standing rule that a refusal must carry evidence. A set states `spurns`; a semantic must be **drawn or spurned and never both**, an unstated gap fails, and the written refusals are asserted against a declared list, so a new one cannot appear without someone writing it down. That is the `sheer` and `veiled` pattern from `theme.test.ts` applied one layer up. |
| P151 | A refusal renders nothing. It first fell back to base's line drawing, which meant **a language displaying the symbol it had just refused** — and it also collapsed a distinction that had been called premature and now has two real instances. *Borrowed* is an outside constraint, a set that has not been drawn or cannot be redistributed, and base standing in for it is right. *Spurned* is the language saying it has no such symbol, and standing anything in for it is a lie. Terminal shows five of its own marks on the proof surface and **none borrowed**; the copy button shows the word, which is what a terminal does. |
| — | `--nib` is inert for terminal as it is for material, since a character has no stroke either. Two of the three sets now state a weight they cannot spend, which moves it from an incident (P145) to a shape: **the atom belongs to line sets, and the completeness rule that every language declares every atom makes every language pay for it.** Not yet worth an answer, but it is the second reading. |

## Four sets, four assumptions

| # | Entry |
|---|---|
| P152 | Ant carries a second tone, and it is not an invention: **`twoToneColor` is a documented part of that design language's public API**, so the probe is testing what Ant actually is rather than what the seat found convenient. A set may state `lit` beside `drawn`, the tinted subpaths render under the primary ones, and the second tone is `--accent` against `currentColor`. **This is the first assumption broken that cost no purchase at all** — the atom for it was already in the vocabulary. |
| P153 | The four sets have each broken a different assumption the seat was built on, which is what a completeness oracle is supposed to do and what seven duplicate space runs never did: **base assumed a medium (line), material broke it (solid), terminal broke the medium itself (a character in its own face), ant broke the count of colours (two).** Three of the four required a change to the seat and one did not. Nothing so far has required an atom. |
| — | One reading recorded and not acted on. Ant's own two-tone secondary is a *tint* of the accent, and the vocabulary has no such value: `--flush` is a tint of `--warn`, not of `--accent`. Full-strength accent is legible and reads correctly at both sizes, so nothing is bought; but a second solid two-tone language will ask again, and that is the point at which it becomes a purchase with evidence rather than a guess. |
| — | The guard grew with the seat rather than after it: a second tone may only light a semantic the set actually draws, so a tint cannot outlive the shape it was painted for. Six laws now hold the contract that was an intention two commits ago. |

## The language that owed no set

| # | Entry |
|---|---|
| P154 | Glass was picked as the next probe on the guess that it would break the assumption that a symbol is flat, and it did not, because **glassmorphism is a property of surfaces and not of marks**. Glass already states `panel` and `deck` as translucent whites, `frost` and `fog` as blurs and `lift` as a shadow; its symbols are thin light lines standing *on* the glass rather than made of it. Rendered with no set at all — base's geometry in glass's own ink — the result is already right, and a gradient-filled mark would have been less legible against its own wash. **The seat's existing fallback was the correct answer, and the correct answer was to buy nothing.** |
| P155 | The finding is a criterion, not an excuse, and it is falsifiable: **a language owes its own set when its marks differ in geometry or in medium, and owes none when it differs only in surface.** Material owes one because solid is a drawing tradition; ant owes one because two-tone is; terminal owes one because a character is another medium entirely. Carbon will owe one, since its marks are cut to a sixteen grid; brutal and folio will owe one. Glass, on this criterion, owes nothing, and the roadmap shrinks from fourteen sets to the handful that actually draw differently. |
| P156 | The criterion has a machine half, and it is the same lesson as the seven duplicate spatial runs one layer up: **no set may state a shape identical to the one the authored language already drew.** A set that copies is not authoring, it is filling a slot, and P125 is the standing evidence for how long that can hide. Verified to bite by giving material base's caret: `material.pick`. Seven laws hold the contract now, and the one that matters most forbids the cheapest way to satisfy the others. |

## One live area, and the coupling nobody had stated

| # | Entry |
|---|---|
| P157 | Base's marks were centred well — every one sits at 12,12 within a pixel — and **wildly unequal in size**. Measured by bounding box in the twenty four grid, the major dimension ran from **6 to 20**, so `pick` at twelve by six stood beside `warn` at twenty by seventeen and read as a third of its weight. Centring is the half of optical normalisation that is easy to get right by accident; size is the half that has to be measured. |
| P158 | Measuring the two-tone set the obvious way was wrong and the numbers said so. **Ant's `drawn` paths are the detail sitting on a `lit` body**, so `ant.fold` measured six by nine when the mark a reader sees is twenty by twenty. A law that had shipped against `drawn` alone would have demanded that ant redraw shapes that were already correct. **The union of the tones is the mark; either half alone is a fragment.** |
| P159 | The law found a coupling nothing in the system had stated: **a mark's live area and a language's stroke weight are bound together, and no atom says so.** A stroked mark renders `--nib` wider than its bounding box, and brutal states a nib of three, so base's widest marks would have overflowed a twenty unit live area in that language alone. The norm is therefore a bounding box of seventeen for line sets and twenty for solid ones, both landing at twenty rendered. Nine marks across three sets were recut to it. |
| P160 | Held in `apps/docs/tests/shape.test.ts`, browser-measured because an exact bounding box for arcs is the browser's job and not worth reimplementing. It found its own home: adding it to `look.test.ts` pushed that file to 333 lines against a limit of 300, and **the file law fired correctly** — a guard about shapes and a guard about surfaces are two subjects. Verified to bite by restoring the old triangle: `base.warn 23.0x20.0`. |

## The same page, wearing every language

A method rather than a repair. Three passes of picking targets by judgement
had moved the score by nothing, and the one pass that moved it came from a
stated complaint. So the complaint was found by comparison instead of by eye.

| # | Entry |
|---|---|
| P161 | `/` was rendered unchanged in swiss, carbon and material by setting `data-system` on its shell, and swiss was **plainly better on the same content**. That is not a matter of taste, it is a fixture: ten of the fourteen languages are reference systems drawn from the real world, so **base can be measured against its own probe set** instead of against an opinion. Whatever base sits at the extreme of, with no reason for being there, is the complaint. |
| P162 | **`--heft` is 400 in base and 500 to 800 in twelve of the other thirteen.** It is the weight every heading and the hero are set in, and base was the only language setting its display type at regular weight without a reason — terminal shares the 400 and has one, since a terminal is monoweight. Spectral's six hundred cut is already loaded. **One value, and the claim finally has mass at the same size it had before.** |
| P163 | The second reading was structural before it was chromatic. Base's ink at 9.5 against its ground sat at the bottom of the set, and lightening the ground alone could not fix it, because **panel was already at the ceiling** — a lighter ground would have collapsed the raised bands into the page. The ordering was not the fault: `panel > ground > well` is the most common arrangement, six of thirteen. **The fault was the gap.** Peers with that ordering keep ground within three to five percent of panel; base's sat forty four percent below it. |
| P164 | Re-cut with every guarded pair computed in advance: ink over ground **9.49 → 14.27** against a peer median of 15.4, panel over ground **1.35 → 1.07** against a peer band of 1.03 to 1.05, and band separation held at 1.17. Every contrast the theme guard holds passed with more headroom than before. **Base moved thirty seven traits in `look.json` and no other language moved at all**, which is the shape of every change that has ever scored on this surface. |

## What polish cannot buy

| # | Entry |
|---|---|
| P165 | Two more outliers were found by the comparison method and neither moved the score, while the owner reported sensing that *something* had changed. Set against the whole record, the division is clean: **every change that has ever scored either added a kind of element the surface did not have, or altered its character at scale.** The Course generator, the split voice, the icons, the type and space re-cut that took 800 pixels off the page. **Every change that refined an element already present has scored nothing** — the fold repair, the optical normalisation, the display weight, the palette. Both kinds are worth making and only one is worth counting. **What is being scored is character, and what measurement finds is correctness.** |
| P166 | The method still earned its keep in the same pass by killing two of its own hypotheses. `--lift` looked absent from base until the tone was read, where it is stated and checked by `palette()`; base looked exempt from the completeness rule until the same reading showed the hues and the shadow live in the tone by design. **Three hypotheses, one true, two refuted by the measurement that tested them** — which is the shape a method should have, and the reason the two false ones cost nothing. |
| — | Recorded and not acted on, because the owner holds a sharper complaint. Four categories of which `/` has exactly none: **motion** (nothing on the surface moves; `--beat` is spent only on hover), **imagery** (no photograph or illustration), **a diagram of relations** (the six rooms are six marks in a grid, which shows the parts and not how they stand to one another), and **data drawn rather than listed** (the tally is four numbers in a row). Each is a kind the page lacks entirely, which by P165 is the class that has moved the number. |

## The word was ragged, not the row

| # | Entry |
|---|---|
| P167 | The complaint was that the copy in the bar looked cheap, `gallery` typically, and the first reading of it was wrong. Measured, the wordmark's baseline sat at 42.4 and the link's at 36.0, so **the row was aligning boxes rather than baselines** — a real fault and not the one being pointed at. The owner was pointing at **the letterforms**: `gallery` runs `g` down, `ll` up, `y` down inside six characters, and it is set bold beside two regular-weight neighbours. **A word's silhouette, not a row's alignment.** |
| P168 | It is a classic problem and it has a name: **the bouma, the shape a lowercase word makes.** A label carrying both ascenders and descenders occupies a taller, busier band than its neighbours, and a row of such labels never reads as one strip. The three standard answers are all caps with tracking, small caps, and choosing labels without descenders. Rendered side by side: **caps works and shouts**, and **small caps is synthesised by `system-ui` into caps at a smaller size**, so it costs a font feature and buys nothing. |
| P169 | The fourth answer was the one the repository had already decided. **P93 settled that a package name is an identifier and is set as one**, which is why the wordmark stands in `--exact`. A route name is an identifier. So are the values in a language picker and a tone picker. **The bar was three identifiers wearing two faces**, and setting the whole strip in the identifier face is that decision carried one step further rather than a new preference. It also happens to calm the letterforms, because a monospace descender is shallower and an even advance makes a ragged word read as a regular strip. |
| — | Scoped to `banner-exact`, and the scoping is the interesting half. **A banner already declares whether its title is an identifier**, so the claim is not "bars are monospace" but "a bar whose title is an identifier is an identifier strip". Material's plain banner is untouched and still sets its links in Roboto, which is correct for Material and would not have been if the rule had been written on `.banner`. The first attempt was written on `.banner` and **introduced the split it was meant to remove** — material's wordmark stayed in its display face while its links went mono. |

## The bold was mine

| # | Entry |
|---|---|
| P170 | The owner said `gallery` looked cheap and named the geometry of its `g` and `l`. The first answer was the identifier face, which is defensible on its own — P93 already settled that a package name is set as an identifier, and a route name and two picker values are identifiers too — but the owner reported no change, and he was right. **Changing the face does not remove a descender.** The bouma stayed exactly as ragged as before. |
| P171 | The cause was one commit old and it was mine. `.link` stated `font-weight: var(--heft)`, and the pass before had raised base's `--heft` from 400 to 600 to give the headings mass. **Every link on the surface went bold as a side effect, and the most prominent small word on the page went with it.** A jagged silhouette set at display weight is what the complaint was about; the letterforms were never the fault, the weight was. |
| P172 | The repair is a deletion. **A link is not display type and had no business claiming display weight** — `.link` states no weight now and inherits the region it stands in, which is the same principle as a member not stating the space a region owns (P136). Set beside what the owner saw, the word matches its neighbours in face and weight and the two `l` stop reading as posts. Four treatments were rendered at real size before choosing — caps, small caps, thinner, and the face — and the two that worked, thin and caps, both worked by dropping the weight. **Caps was the owner's own guess and it was close: it fixed the symptom the deletion fixes at the cause.** |
| — | The general shape, third instance: `--space-3` served prose and controls (P133), `--nib` is inert for solid sets (P145), and `--heft` served display and links. **An atom acquires a second role silently, and the tell is always that changing it for one role damages the other.** Here it was found in a day rather than a pass, because the owner was looking at the surface while the change was still fresh. |

## The measurement ranked it first and taste overrode it

| # | Entry |
|---|---|
| P173 | Five treatments of the bar label were rendered and compared at four times size: the original sans at 600, the identifier face at 600, both at 400, and caps at 400. **Caps at regular weight with tracking was plainly the most regular of the five** — one cap band, no descenders, matching its neighbours in weight. It was rejected anyway, on the grounds that caps shout. That was a taste judgement from the faculty this session has shown to be the unreliable one, and it overrode the faculty that has been reliable. **The measurement was run, read correctly, and then ignored.** |
| P174 | Shipping the weight fix alone was correct at the cause and invisible at the effect. **Set side by side at actual size the two frames are nearly identical**, which is the whole of what the owner reported. A repair aimed at a cause still has to be visible at the size the reader looks at it; correctness at 4x is not a result at 1x. |
| — | Caps is scoped to the label and not to the pickers, and the reason is functional as well as semantic. `text-transform` reaches the text a `select` shows when closed and not the native option list it opens, so uppercasing a picker would have made the closed state disagree with the open one. **`gallery` is a name the interface chose and `English` is a name the world chose**, which is the line the two registers fall on anyway. |

## A batch under one proposition

The owner's brief was that the previous repair was too local to count, and
that the proposition — how the copy presents itself — probably holds more
classic problems. It held four, and three were worth fixing.

| # | Entry |
|---|---|
| P175 | Measured across every text block on the surface: **four last lines carried a single word**, and two of them were the largest and second-largest pieces of type on the page. The hero read `Eleven design languages. One / structure.`, so **the claim's second clause was split across a line break** and its last line was one orphaned word. Widows are the oldest defect in setting copy and the page had them at its two most prominent seats. |
| P176 | The fix is one property and it is the modern standard answer: **`text-wrap: balance` for display, `text-wrap: pretty` for running prose.** Neither existed anywhere in the repository. The hero now reads `Eleven design languages.` and `One structure.`, which is what the sentence is, and **the widow count across the surface went from four to zero**. |
| P177 | The distinction between the two values is not decoration and the supporting line proved it. Under `pretty` it broke as `is a value, not / a fork.`, avoiding the widow by splitting the idiom; under `balance` it breaks as `A Svelte component library whose / design language is a value, not a fork.`, which keeps the sentence's payload whole on one line. **`pretty` refuses a widow, `balance` chooses where to break** — so display and short lines take balance and running prose takes pretty. |
| P178 | Line length was measured and is not a defect: 48 to 69 characters across the prose blocks, inside the comfortable band, with only the hero's supporting line short at 36 and that by its own measure. **Recorded because a swept proposition should report what it cleared as well as what it caught.** One real inconsistency was caught: `Head look="quiet"` rendered `add the packages` and `What it is made of` — the same component carrying two capitalisation conventions. The steps take sentence case now, which is what every loud head already used. |
| — | Held by `packages/design/tests/wrap.test.ts`: **every generator that sets a paragraph or a heading must state how it wraps**, and a wrap discipline must be `balance` or `pretty`. It found four generators with none — Banner, Board, Card and Note — which is the usual proportion for a rule written after the fact. Verified to bite by removing Note's: `mark/Note/Note`. |

## The substrate was already animatable

The owner asked for the highest-yield item on `/` and took the answer: the run
that carries the surface's one claim was proving it with four small static
cards. It shows one card now, and the eleven languages walk through it.

| # | Entry |
|---|---|
| P179 | **Motion cost no atom.** Every atom is registered with `@property` and a syntax — `<color>`, `<length>`, `<number>` — which is what makes a custom property interpolable, and the repository had paid that price for the theme contract without ever spending it. A theme change is a set of custom property changes on one element, so a `transition` on the shell makes the whole cascade slide. `tokens.morph` derives its property list from the same three lists `dress()` reads, so an atom added tomorrow moves with the rest and nothing has to be kept in step by hand. |
| P180 | **The transition duration cannot be `--beat`, and the reason is the interesting half.** The first version read `var(--beat)` and snapped instead of sliding. Transitions resolve their duration from the after-change style, and four languages state `beat: 0s` — swiss, brutal, terminal and the one the demonstration starts from. So the morph died precisely where the change is largest. A beat is a language's own tempo, and **a transition between two languages belongs to neither of them**: it is stated by the surface that decided to show them in sequence. `Shell slide` carries it, through the local `--slid` that `Grid` already had precedent for with `--ruled`. |
| P181 | **`grounds-differ` was fitted to a curated four, and eleven does not fit it.** Measured over every ordering of the eleven, the best possible cycle has a worst consecutive gap of 5.6 in Lab against a law demanding 10. That is not a defect in the set: **eight of the eleven grounds are near-white**, between L 90 and L 100, because most real design languages are paper. Ground is what separated swiss from glass from terminal in a sample chosen for exactly that spread; it is not what separates carbon from folio from cupertino. A law that reads one channel can only judge a set that was picked on that channel. |
| P182 | Replaced by `change-shown`, aimed at what a sequence is actually for: **a step nobody can see is not a demonstration.** Eight channels are read out of `look.json` and the theme sources — ground, ink, accent, radius, rim, size, face, shadow — each with its own threshold, and at least four must cross between consecutive specimens. Verified in both directions, which is the discipline P121 cost: the designed order carries a minimum of five, and a naive order fires on `base/ant 2`, `ant/carbon 2` and `cupertino/material 3` — **the three pairs the eye reads as repeats, and no others.** The order of the eleven is now a designed object rather than a list. |
| — | Two atoms cut rather than slide, and they are the ones registered with `syntax: "*"`: the faces and the films. Glass's wash pops into place while its colours are still moving. Recorded and not fixed — an interpolable syntax for a gradient does not exist, and a cross-fade between two shells is a second element, which is a larger purchase than this run needed. |
| — | Density fell from 647 glyphs per megapixel to 548 and **no information left the page**: the three glyph-carrying copies that went were three repetitions of one sentence. The gauge counts repetition. What went back in its place is real — the markup all eleven renders share, stated beside them, so the run's claim can be checked rather than believed. 1624 to 1755 glyphs on that reading. **A density figure is only comparable across surfaces that repeat themselves equally.** |

## The strip at the top is not a header

The owner opened the block-by-block pass on it and asked what the design
closure calls it. The answer that was already in the tree was wrong, and the
argument for keeping it was mine.

| # | Entry |
|---|---|
| P183 | **`Banner` was defended on the grounds that the platform had already fixed the word.** The component renders a `<header>` whose ancestors are four `div` and `body`, so it does map to `role="banner"`, and the ARIA definition of that landmark is a close description of the job. That is a real fact and it is the wrong one to name from. **A landmark role is what the platform must call it to expose it; it is not what the design system calls it to its own readers.** The word carries an advertisement, a cookie notice and a hero image in every other place a reader has met it, and none of those is this. |
| P184 | Renamed `Navigator`. The objection worth writing down is the one that failed: **a name that states one of two jobs installs the two-role defect on day one** — the same shape as `--space-3`, `--nib` and `--heft` (P133, P145, P171), except put there by the name rather than found later. It failed because the identity half is not a second job. **The wordmark is a stop, not a heading**: it is where the reader is, and the ways out stand beside it. Identifying the surface and offering the ways off it are one responsibility, and `Navigator` names it. |
| P185 | Renaming it found the defect the name was hiding. `Banner` set its title in `<h1>`, and every page also sets an `<h1>` in its `Hero`, so **every surface in this repository shipped two `<h1>`** — the wordmark and the claim, each declaring itself the heading of the document. It is not a matter of taste: a document has one heading, and the strip at the top was never it. The title is a `<p class="navigator-name">` now, carrying the same declarations, and each page is down to the one heading it always meant. |
| — | The rename and the outline repair together moved **not one value in `look.json` across all fourteen languages**: seven keys changed name per language and every value under them is byte-identical. A vocabulary change should cost nothing to look at, and this one is the evidence that it did not. |
| — | Not taken, and left open. By the responsibility axis `Navigator` answers "it speaks for the document and survives the scroll", which is nearer `document` than the `enclose` it sits in. `enclose` holds seven and `document` holds three, so the shelf is not the obstacle. Moving a room is a structural cut and the owner has not bought it. |

## Five complaints against the navigator

The owner named five: no brand, weak wordmark typography, weak link
interaction, a raw select, and utility controls that should read as marks and
open into words.

| # | Entry |
|---|---|
| P186 | **A brand is the one graphic that must not change when the language does**, which is exactly the opposite of everything else here, and it is why it cannot live in `@perish/sign`: that package's sets are chosen by look. `@perish/crest` is chosen by product. Its model puts the family beyond argument rather than beyond doubt — **the base geometry is exported once and a product may declare only its own mark**, so a variant that redraws the base cannot be written. What is left is falsifiable and is written as a law: **a mark must stand inside the hold the base leaves it**, measured in the browser lane beside the icon framing law. |
| P187 | What the placeholder deliberately does not fix is **colour**. The crest paints in `--accent`, so it is blue in base, green in terminal and red in brutal. That is wrong for a brand and right for this pass: a real crest fixes its colour, and a fixed colour is the first thing that will fight fourteen grounds. Recorded as the known cost of the placeholder rather than discovered later. |
| P188 | The wordmark was one string in one weight, and it is not one thing: **`@perish/` is a scope and `design` is a name**, and a reader looking for the product reads the half that was set identically to the half they are skipping. The scope recedes to `--muted` at regular weight, the name takes `--bright` at `--heft`, and the strip's identifier face finally takes `--track` instead of resetting tracking to zero. The lockup is also a link now, which is P184 made operable: a wordmark that is a stop should be takeable. |
| P189 | **An icon-only control cannot be built on a set that is allowed to refuse.** `terminal` spurns `tongue` and `shade` — correctly, it is a text medium — so the trigger has nothing to draw. The fallback is `.menu-cue:has(.sign) .menu-word`, which means **the label hides only when a shape actually rendered**, not because a second declaration says it should. A control that is a mark in ten languages is a word in the one that refuses marks, and neither had to be stated twice. |
| P190 | The requested shape was a mark that expands to words on interaction, and **the width transition it implies was refused**: these controls sit at the end of a strip, so growing one moves every neighbour to its left on hover. The words appear on a layer instead — a tip under the mark on hover and focus, the label carried as the accessible name, and the choices in the panel with the standing one ticked. **Zero layout shift, and the strip is quiet at rest**, which is what the complaint was about. |
| P191 | Using `Menu` for the first time showed it did not hold its own room's contract. `layer` takes responsibility for the top layer, escape, and a trap; `Menu` had a list that opened and nothing that closed it — no Escape, no dismissal on a click outside. Both are held now. **The room stated the obligation two rooms ago and nothing checked that a member met it**, which is the same gap `wrap.test.ts` closed for running text. |
| — | `Pick` is still a native select everywhere else it stands, and the complaint that it looks raw still holds there. The pass moved only the strip, because that is the block being polished. Recorded so the debt is not read as paid. |

## The rooms had no door

The owner asked whether the rooms have an admission rule. They did not: six
directories, each stating an obligation in prose, and nothing anywhere that
checked a member met it.

| # | Entry |
|---|---|
| P192 | **The catalog could file a component in a room its source does not stand in, and every guard stayed green.** `drift.test.ts` compared the set of names and never the grouping, so the axis the whole library is filed on was the one thing no law read. Held now, per room, against the directory. Verified to bite by moving `Navigator` from `enclose` to `layer` in the catalog alone. |
| P193 | **Two of the six rooms state something a machine can hold, and which two was decided by the rooms' own wording rather than by effort.** `focus` says it owns a focusable element and `layer` says escape — both are facts about the source. `mark`, `arrange`, `enclose` and `document` say what a generator *means*, and checking meaning would need the component to declare its own role, which is the proposal that was refused for the cascade band and that makes `one-payload` permanently human-held. **P117 again: whether a law can be mechanised is decided by the rulings this line has already made.** |
| P194 | `Views` escapes all of it. It is exported, it stands in `document/`, and it has no stylesheet — and every law that reads the tree reads only the generators that carry a dress, because that filter is what makes the documentation law true. **A filter written to make one law true also decides what every law built on it cannot see.** Recorded and not repaired: a router paints nothing and the gallery cannot show it, so the honest answer is that the catalog is a catalog of what can be shown, not of what is exported. |
| — | The first probe for the layer rule reported that `Modal` handles no Escape. It was the wrong probe: `Modal` calls `showModal()`, and the platform supplies escape and the trap. P125 again, in the same hour it was being written into a law — the rule greps for `showModal(` as well as for the key, and both are real answers to the obligation. |

## The crest left, and stopped being transparent

`@perish/crest` is its own repository and its own published package now. The
design package consumes `0.1.0` from the registry instead of a sibling in this
workspace.

| # | Entry |
|---|---|
| P195 | **A source-only package stops being transparent the moment it stops being a workspace sibling.** `@perish/sign` ships TypeScript and always has, and nothing ever noticed, because a workspace link is source to every tool that reads it. Installed from a registry the same package is `node_modules`, where Node refuses to strip types and vitest externalises by default — `shape.test.ts` failed on `@perish/crest/crest` the moment the dependency became real. Held by `server.deps.inline` in the docs vitest config. The forge smoke script had already met the same wall and answered it the same way, by compiling through vite rather than reading with bare `node`. |
| P196 | The product's own name and scope moved out of the documentation site's translations. `@perish/` and `design` were sitting in `en/front.ts` and `zh/front.ts` as if they were prose to translate, and they are not: **`design` is not called anything else in Chinese.** They come from `named` in the crest package now, which is the seat that owns what a product is called. |
| — | `sidecar.toml` on `main` no longer starts the docs app here: it states `port = 0` while its health probe interpolates `{port}`, and `sidecar status` reports `docs: stopped` immediately after `sidecar start docs`. The change did not come from this line of work and is recorded rather than reverted. The dev server runs by hand in the meantime. |

## The count became evidence

The homepage content was read before its next visual pass. Its opening claim
named a current inventory and left the lasting design judgment implicit.

| # | Entry |
|---|---|
| P197 | **`Eleven design languages. One structure.` made the roster the proposition.** The number is useful proof and a brittle identity: adding a language makes the homepage's central claim expire even though the idea it demonstrates has not changed. The claim is now `Language changes. Structure remains.`; eleven stays in the specimen heading, where a count is evidence rather than doctrine. |
| P198 | The old first screen introduced `theme`, `values`, `generators`, `markup`, and `atoms` before the reader had seen the claim happen. **Mechanism was occupying the seat where consequence belonged.** The first screen now names the category and says only what varies and what holds: look and feel change; meaning, responsibility, and composition remain. The specimen earns the right to introduce markup, and the model run earns the right to introduce rooms and generators. |
| P199 | **The two halves of the page were adjacent but not joined.** Eleven languages demonstrated variation; six rooms described classification. Renaming the model run `Structure follows responsibility` states the hinge: responsibility is the invariant that lets language vary without semantic drift. The run still says and shows all six rooms, so the tally keeps its referent. |
| — | Search representation now carries the product category independently of the aphoristic H1. English and Chinese front routes state their own title and description, while the document template supplies a title fallback before hydration. The homepage can lead with a brand judgment without asking a search result to infer that it is a Svelte design system. |
