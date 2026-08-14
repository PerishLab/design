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
