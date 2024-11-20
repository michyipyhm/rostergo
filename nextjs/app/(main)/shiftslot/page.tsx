import React, { useEffect, useState } from "react";
import BranchInfo from '@/component/BranchInfo';
import PositionList from "@/component/PositionList";
import ShiftSlotList from "@/component/ShiftSlotList";

export default function ShiftSlot() {

    return (
        <div>
                <ShiftSlotList />
        </div>
    );
}