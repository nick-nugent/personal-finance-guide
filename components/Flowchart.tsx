"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, { Background, Controls, Edge, Node, NodeProps, ReactFlowInstance } from "reactflow";
import "reactflow/dist/style.css";

import { flowchartEdges, flowchartNodes } from "@/data/flowchart";

import { NodeDrawer } from "./NodeDrawer";

type FinanceNodeData = {
  id: string;
  title: string;
  summary: string;
  isCompleted: boolean;
  onSelect: (id: string) => void;
};

const nodeTypes = {
  finance: function FinanceNode({ data, selected }: NodeProps<FinanceNodeData>) {
    const handleClick = useCallback(() => data.onSelect(data.id), [data]);

    return (
      <button
        type="button"
        data-node-trigger={data.id}
        onClick={handleClick}
        className={[
          "flex w-56 flex-col gap-1 rounded-lg border-2 bg-background px-4 py-3 text-left shadow-sm transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          selected ? "border-primary" : "border-border",
          data.isCompleted ? "bg-emerald-50 border-emerald-400 text-emerald-900" : ""
        ]
          .filter(Boolean)
          .join(" ")}
        aria-pressed={data.isCompleted}
      >
        <span className="text-sm font-semibold">{data.title}</span>
        <span className="text-xs text-muted-foreground">
          {data.summary.length > 80 ? `${data.summary.slice(0, 77)}...` : data.summary}
        </span>
        {data.isCompleted ? (
          <span className="text-[10px] font-semibold uppercase text-emerald-700">Marked complete</span>
        ) : null}
      </button>
    );
  }
};

export function Flowchart() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [completedNodes, setCompletedNodes] = useState<Record<string, boolean>>({});
  const lastFocusedNodeId = useRef<string | null>(null);
  const wasDrawerOpen = useRef(false);
  const flowInstanceRef = useRef<ReactFlowInstance | null>(null);

  const nodes: Node<FinanceNodeData>[] = useMemo(
    () =>
      flowchartNodes.map<Node<FinanceNodeData>>((node) => ({
        id: node.id,
        position: node.position,
        data: {
          id: node.id,
          title: node.title,
          summary: node.summary,
          isCompleted: Boolean(completedNodes[node.id]),
          onSelect: (id: string) => {
            lastFocusedNodeId.current = id;
            setSelectedNodeId(id);
          }
        },
        type: "finance"
      })),
    [completedNodes]
  );

  const edges: Edge[] = useMemo(
    () =>
      flowchartEdges.map((edge) => ({
        ...edge,
        animated: true
      })),
    []
  );

  const selectedNode = useMemo(
    () => flowchartNodes.find((node) => node.id === selectedNodeId),
    [selectedNodeId]
  );

  const drawerOpen = Boolean(selectedNode);

  const handleInit = useCallback((instance: ReactFlowInstance) => {
    flowInstanceRef.current = instance;
    instance.fitView({ padding: 0.2, includeHiddenNodes: false });
  }, []);

  useEffect(() => {
    if (!flowInstanceRef.current) {
      return;
    }
    flowInstanceRef.current.fitView({ padding: 0.2, includeHiddenNodes: false });
  }, [nodes]);

  useEffect(() => {
    if (wasDrawerOpen.current && !drawerOpen && lastFocusedNodeId.current) {
      const trigger = document.querySelector<HTMLButtonElement>(
        `[data-node-trigger="${lastFocusedNodeId.current}"]`
      );
      trigger?.focus();
    }
    wasDrawerOpen.current = drawerOpen;
  }, [drawerOpen]);

  const handleCloseDrawer = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const handleToggleComplete = useCallback((id: string) => {
    setCompletedNodes((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  return (
    <div className="relative h-full min-h-[600px] w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onInit={handleInit}
        fitView
        fitViewOptions={{ padding: 0.2 }}
      >
        <Background gap={32} color="var(--muted-foreground)" />
        <Controls />
      </ReactFlow>
      <NodeDrawer
        open={drawerOpen}
        node={selectedNode}
        isCompleted={selectedNode ? Boolean(completedNodes[selectedNode.id]) : false}
        onClose={handleCloseDrawer}
        onToggleComplete={
          selectedNode
            ? () => handleToggleComplete(selectedNode.id)
            : () => {
                /* no-op */
              }
        }
      />
    </div>
  );
}

export default Flowchart;
