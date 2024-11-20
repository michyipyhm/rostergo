import React, { useEffect, useState } from "react";
import BranchInfo from '@/component/BranchInfo';
import PositionList from "@/component/PositionList";

export default function Branch() {

    return (
        <div>
            <div>
                <BranchInfo />
            </div>
            <div>
                <PositionList />
            </div>
            <div>
            </div>
        </div>
    );
}