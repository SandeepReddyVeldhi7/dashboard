"use client";

import { Accordion } from '@base-ui/react/accordion';
import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
// import SelectCalendar from './SelectCalendar';

type ChannelChild = {
    id: string;
    name: string;
};

type CalendarSidebar = {
    id: string;
    name: string;
    children: ChannelChild[];
};

const INITIAL_CHANNELS: CalendarSidebar[] = [

    {
        id: "my calendar",
        name: "My Calendar",
        children: [
            { id: "my calendar", name: "My Calendar" },
            { id: "united states holidays", name: "United States Holidays" },
            { id: "Birthdays", name: "Birthdays" },
        ],
    },

    {
        id: "group",
        name: "Groups",
        children: [
            { id: "group1", name: "Group 1" },
            { id: "group2", name: "Group 2" },
            { id: "group3", name: "Group 3" },
        ],
    },
];

export default function CalendarSidebar() {
    const [groups, setGroups] = useState(INITIAL_CHANNELS);

    return (
        <aside className="w-72 h-screen flex-shrink-0 flex flex-col bg-app-sidebar border-r border-app-border text-sm">
            {/* HEADER */}
            <div className="px-4 py-3  flex items-center ">
                <span className="font-semibold text-xl px-2 py-1.5 text-text-primary">
                    Calendar
                </span>


            </div>

            {/* CHANNEL GROUPS */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
                <Accordion.Root defaultValue={["channels"]}>
                    <Accordion.Item value="channels">
                        <Accordion.Panel className="mt-2 space-y-2">
                            {/* <SelectCalendar />, */}
                            {groups.map((group) => (
                                <CalendarGroupItem key={group.id} group={group} />
                            ))}
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion.Root>
            </div>
        </aside>
    );
}

function CalendarGroupItem({ group }: { group: CalendarSidebar }) {
    return (
        <Accordion.Root>
            <Accordion.Item value={group.id}>
                {/* GROUP HEADER */}
                <Accordion.Header>
                    <Accordion.Trigger className="group flex items-center justify-between w-full px-2 py-1.5 rounded-md hover:bg-state-hover text-text-secondary hover:text-text-primary">
                        <div className="flex items-center gap-2">
                            <ChevronDown className=" transition group-data-panel-open:rotate-180 text-text-muted" />

                            <span className="text-md font-semibold tracking-wide">
                                {group.name}
                            </span>
                        </div>
                    </Accordion.Trigger>
                </Accordion.Header>

                {/* CHILDS */}
                <Accordion.Panel className=" space-y-1">
                    {group.children.map((channel) => (
                        <button
                            key={channel.id}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-md text-text-secondary hover:bg-state-hover hover:text-text-primary transition"
                        >
                            <input type="checkbox" className="rounded-4xl h-3 w-4" />
                            {channel.name}
                        </button>
                    ))}
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion.Root>
    );
}