<script lang="ts">
 import { Form, Field, Tabs, Text } from "@perishlab/design";
 let { busy = false }: { busy?: boolean } = $props();
</script>

<Form label="Edit record" validate={false} {busy} submit={() => {}}>
 <Field label="Title" required error="A title is required" disabled={busy} />
 <Field label="Identifier" value="EXP-024" readonly disabled={busy} />
</Form>
<Tabs label="Record scope" tabs={[{ value: "all", label: "All" }, { value: "held", label: "Held" }]} value="all"><Text>Records</Text></Tabs>
