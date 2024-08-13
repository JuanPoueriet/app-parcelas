import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.scss'
})
export class PruebaComponent {
  
  @ViewChild('chart', { static: true }) private chartContainer: ElementRef;
  @Input() data: number[] = [];

  newData: number;  // Valor del nuevo dato a agregar
  dataIndex: number;  // Índice del dato a actualizar
  updatedValue: number;  // Nuevo valor para el dato existente

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.updateChart();
    }
  }

  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
    const element = this.chartContainer.nativeElement;
    d3.select(element).append('svg')
      .attr('width', 300)
      .attr('height', 300)
      .append('g')
      .attr('transform', 'translate(150, 150)');

    this.updateChart();
  }

 

  updateChart(): void {
    const svg = d3.select(this.chartContainer.nativeElement).select('svg > g');
    const radius = 150;
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const pie = d3.pie();
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
  
    const data = pie(this.data);
    const paths = svg.selectAll('path').data(data);

    // Update existing arcs
    paths.transition()
      .duration(5000)
      .attrTween('d', function(d) {
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          return arc(interpolate(t));
        };
      })
      .attr('fill', (d, i) => color(i));
  
    // Enter new arcs
    paths.enter().append('path')
      .attr('fill', (d, i) => color(i))
      .each(function(d) {
        this._current = { startAngle: d.startAngle, endAngle: d.startAngle }; // Set the initial angles
      })
      .transition()
      .duration(5000)
      .attrTween('d', function(d) {
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          return arc(interpolate(t));
        };
      });
  
    // Exit removed arcs
    paths.exit()
      .transition()
      .duration(5000)
      .attrTween('d', function(d) {
        const interpolate = d3.interpolate(d, { startAngle: d.startAngle, endAngle: d.startAngle });
        return function(t) {
          return arc(interpolate(t));
        };
      })
      .remove();
  
    // Update text labels
    const texts = svg.selectAll('text').data(data);
  
    texts.enter().append('text')
      .attr('text-anchor', 'middle')
      .text(d => d.data)
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .style('fill-opacity', 0)
      .transition()
      .duration(5000)
      .style('fill-opacity', 1);
  
    texts.transition()
      .duration(5000)
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .text(d => d.data);
  
    texts.exit()
      .transition()
      .duration(5000)
      .style('fill-opacity', 0)
      .remove();
  }
  
  addData(): void {
    if (this.newData) {
      this.data.push(this.newData);
      this.newData = null; // Limpiar el input después de agregar
      this.updateChart();
    }
  }

  updateData(): void {
    if (this.dataIndex != null && this.dataIndex < this.data.length && this.updatedValue != null) {
      this.data[this.dataIndex] = this.updatedValue;
      this.updateChart();
      this.dataIndex = null;
      this.updatedValue = null; // Limpiar los inputs después de actualizar
    }
  }
}